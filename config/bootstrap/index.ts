/**
 * ==================================================================
 * Vite 配置引导模块，分离更细方式进行维护第三方插件实现更复杂的配置
 * ------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao) License MIT
 * ==================================================================
 */

import { type ConfigEnv, type UserConfig, loadEnv, normalizePath } from 'vite';
import fs from 'fs';
import bootstrapDefine from './define';
import bootstrapBuild from './build';
import bootstrapPlugins from './plugins';
import bootstrapServer from './server';

function formatEnv(envs: Record<string, string>): ViteEnv {
  const ret: any = { DEBUG: envs.VITE_APP_DEBUG ? envs.VITE_APP_DEBUG.toLowerCase() == 'true' : process.argv.includes('--debug') };
  process.env['DEBUG'] = ret.DEBUG;
  for (const envName of Object.keys(envs)) {
    let realName = (envs[envName] as any).replace(/\\n/g, '\n');
    if (['true', 'false'].includes(realName.toLowerCase())) {
      realName = JSON.parse(realName.toLowerCase());
    }

    if (/^[0-9]*$/.test(realName)) {
      realName = Number(realName);
    }

    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

async function bootstrapConfig(config: ConfigEnv, userConfig?: UserConfig, rootdir?: string): Promise<UserConfig> {
  const { command, mode } = config;
  const isBuild = command === 'build';
  const envs = formatEnv(loadEnv(mode, `./config/`));
  const root = normalizePath(rootdir || process.cwd()); // 项目根目录
  const modules = normalizePath(`${root}/node_modules/`); // 第三方依赖存放路径
  // 传递给所有vite插件配置的全局参数
  const options: viteUserOptions = { envs, isBuild, command, mode, path: { root, modules } };

  envs.DEBUG && console.time('bootstrapVitePlugin');

  // =========================================================================================
  // vite 基础起始配置，这里不需要去改动它，只需要在 vite.config.ts 中添加配置即可
  // =========================================================================================
  const viteConfig: UserConfig = Object.assign(
    {
      clearScreen: false,
      base: envs.VITE_APP_BASE_URL || '/',
      resolve: { dedupe: ['vue'], alias: {} },
      css: {
        preprocessorOptions: {
          scss: {}
        }
      }
    },
    userConfig
  );

  if (fs.existsSync('./src/assets/globals.scss')) {
    //@ts-ignore
    viteConfig.css.preprocessorOptions.scss.additionalData = '@import "./src/assets/globals.scss";';
  }

  // 使用 esbuild 打包时去除 console.log && debugger
  // 注: esbuild 打包相对要比 terser 打包快, 但打出来的包相对会大那么一点点
  viteConfig.esbuild = {
    drop: options.isBuild && options.mode == 'production' ? ['console', 'debugger'] : []
  };

  // 全局变量配置
  viteConfig.define = bootstrapDefine(options);

  // 打包配置
  viteConfig.build = bootstrapBuild(options);

  // 开发服务容器环境配置
  viteConfig.server = bootstrapServer(options);

  // 异步导入项目所需的所有vite插件配置
  viteConfig.plugins = await bootstrapPlugins(options);

  envs.DEBUG && console.timeEnd('bootstrapVitePlugin');

  return viteConfig;
}

export { bootstrapConfig as default };
