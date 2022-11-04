/**
 * ==================================================================
 * 配置项目所用到的vite插件，修改components子目录文件后，将会自动重启vite
 * ------------------------------------------------------------------
 * 注：vite插件扩展，与vue插件有本质区别，并非项目打包所需，仅为开发所用
 * ------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao) License MIT
 * ==================================================================
 */
import { type Plugin, type PluginOption, normalizePath } from 'vite';
import path from 'path';
import fs from 'fs';

//===================================================================
// 预构建项目所用到的vite插件配置文件
//===================================================================
const bundleConfigFile = async (root: string, fileName: string, isESM = false) => {
  const result = await require('esbuild').build({
    absWorkingDir: root,
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    sourcemap: false, //'inline',
    metafile: true,
    plugins: [
      {
        name: 'externalize-deps',
        setup(build: any) {
          // 加载文件时触发
          build.onResolve({ filter: /.*/ }, (args: any) => {
            const id = args.path;
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true
              };
            }
            return {
              external: false
            };
          });
        }
      },
      {
        name: 'replace-import-meta',
        setup(build: any) {
          build.onLoad({ filter: /\.[jt]s$/ }, async (args: any) => {
            const contents = fs.readFileSync(args.path, 'utf8');
            return {
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
              contents: contents
                .replace(/\bimport\.meta\.url\b/g, JSON.stringify(`file://${args.path}`))
                .replace(/\b__dirname\b/g, JSON.stringify(path.dirname(args.path)))
                .replace(/\b__filename\b/g, JSON.stringify(args.path))
            };
          });
        }
      }
    ]
  });
  const { text } = result.outputFiles[0];
  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : []
  };
};

//===================================================================
// 扩展插件作用：修改指定目录文件自动重启vite服务
//===================================================================
const autoRestartVite = (root: string, modulesPath: string, scanPath: string): Plugin => {
  let timer: NodeJS.Timeout;
  const changeConfigFile = (path: string) => {
    const time = new Date();
    try {
      fs.utimesSync(path, time, time);
    } catch (err) {
      fs.closeSync(fs.openSync(path, 'w'));
    }
  };
  return {
    name: 'vite-plugin-auto-restart',
    apply: 'serve',
    configureServer({ watcher }) {
      const checkReload = async (eventName: string, pathname: string) => {
        let isReload = false;
        pathname = normalizePath(pathname);
        if (pathname.includes('types/auto-imports.d.ts') || pathname.includes('types/components.d.ts')) {
          return;
        }
        if (pathname.includes(`${root}/src/assets/globals.scss`)) {
          if (['add', 'unlink'].includes(eventName)) {
            isReload = true;
          }
        } else if (pathname.includes(`${root}/src/layouts/`)) {
          if (['add', 'unlink'].includes(eventName)) {
            isReload = true;
          }
        } else if (pathname.includes(`${root}/src/hooks/`)) {
          if (['add', 'change', 'unlink'].includes(eventName)) {
            isReload = true;
          }
        } else if (pathname.includes(`${root}/config/`)) {
          if (['add', 'change', 'unlink'].includes(eventName)) {
            if (pathname.includes(scanPath)) {
              const fname = pathname.replace(scanPath, '').split('/')[0];
              if (fname.includes('@')) return;

              const cacheFile = `${modulesPath}/.cache/vite-plugins/${fname}.cjs`;
              if (fs.existsSync(cacheFile)) {
                delete require.cache[require.resolve(cacheFile)];
                fs.unlinkSync(cacheFile);
                if (eventName !== 'unlink') {
                  const jsconfigFile = path.join(scanPath, fname, 'index.ts');
                  const bundled = await bundleConfigFile(root, jsconfigFile);
                  fs.writeFileSync(cacheFile, bundled.code);
                }
              }
            }
            isReload = true;
          }
        }
        if (isReload) {
          if (timer) clearTimeout(timer);
          const configPath = path.resolve(root, 'vite.config.ts');
          timer = setTimeout(() => {
            if (fs.existsSync(configPath)) {
              changeConfigFile(configPath);
            }
          }, 100);
        }
      };
      watcher.on('all', checkReload);
    }
  };
};

// vite plugin
export default async (options: viteUserOptions): Promise<(PluginOption | PluginOption[])[]> => {
  const root = options.path.root;
  const modulesPath = options.path.modules;
  const isDebug = options.envs.DEBUG || false;

  //=========================================================================================
  // 从 components 子目录获取所有 vite 扩展插件配置自动装载进 vite.plugins 参数中, 忽视@开头的插件
  //=========================================================================================
  const consola = require('consola');
  consola.start('Starting build resolved config...');

  // 耗时统计
  const perf_hooks = require('perf_hooks');
  const start = perf_hooks.performance.now();
  const getTime = () => `${(perf_hooks.performance.now() - start).toFixed(2)}ms`;

  // 生成多层文件夹
  const mkdirsSync = (dirname: string) => {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    return false;
  };

  // 需要检索vite插件模块扩展配置所在路径
  const scanPath = normalizePath(`${__dirname}/components/`);

  // 异步处理可迭代的配置数组或对象
  const plugins: (PluginOption | PluginOption[])[] = await Promise.all(
    fs.readdirSync(scanPath).map(async fname => {
      if (fname.includes('@')) return;
      const jsconfigFile = path.join(scanPath, fname, 'index.ts');
      if (!fs.existsSync(jsconfigFile)) return;

      const cacheFile = `${modulesPath}/.cache/vite-plugins/${fname}.cjs`;
      if (!mkdirsSync(path.dirname(cacheFile))) {
        throw new Error(`vite plugins cache path not found`);
      }

      let writeCacheFile = false;
      if (fs.existsSync(cacheFile)) {
        const cacheObj = fs.statSync(cacheFile);
        const statsObj = fs.statSync(jsconfigFile);
        if (statsObj.mtimeMs > cacheObj.mtimeMs) {
          delete require.cache[require.resolve(cacheFile)];
          writeCacheFile = true;
        }
      } else {
        writeCacheFile = true;
      }

      if (writeCacheFile) {
        const bundled = await bundleConfigFile(root, jsconfigFile);
        fs.writeFileSync(cacheFile, bundled.code);
        require.cache[require.resolve(cacheFile)];
      }

      const raw = require(cacheFile);
      const userConfig = raw.__esModule ? raw.default : raw;
      const pluginsConfig = await (typeof userConfig === 'function' ? userConfig(options) : userConfig);

      const isObject = Object.prototype.toString.call(pluginsConfig);
      if (!['[object Array]', '[object Object]'].includes(isObject)) {
        return;
      }

      isDebug && consola.info(`Loading ${fname}:config in ${getTime()}`);

      return pluginsConfig;
    })
  );

  // 修改指定目录内文件，自动重启vite
  plugins.push(autoRestartVite(root, modulesPath, scanPath));

  consola.success('Resolved config built!\n');

  // 扁平化移除无效的插件配置然后返回
  return plugins.flat().filter(p => !!p);
};
