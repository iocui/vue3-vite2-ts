/**
 * ==================================================================
 * Vite 打包配置选项 see https://cn.vitejs.dev/config/#build-target
 * ------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao) License MIT
 * ==================================================================
 */
import { resolve } from 'path';
import type { BuildOptions } from 'vite';
import { version } from '../../../package.json';

export default (options: viteUserOptions) => {
  // Vite 打包整个项目配置
  let buildAPP: BuildOptions = {
    target: 'es2015',
    sourcemap: options.isBuild && options.mode == 'development',
    // 打包文件大小警告的限制 https://cn.vitejs.dev/config/#build-chunksizewarninglimit
    chunkSizeWarningLimit: 800,
    // 禁用 gzip 压缩大小报告, 提高大型项目的构建性能
    reportCompressedSize: false,
    // development模式打包使用esbuild
    minify: 'esbuild',
    rollupOptions: {
      output: {
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: `assets/js/main-[hash].${version}.js`,
        assetFileNames: chunkInfo => {
          if ((chunkInfo.name + '').includes('.css')) {
            return `assets/css/[name]-[hash].[ext]`;
          }
          return `assets/res/[name]-[hash].[ext]`;
        }
      }
    }
  };

  // ==========================================================
  // 自行选择是否使用 terser 打包(包相对会稍小些, 打包速度也会稍慢)
  // see https://esbuild.github.io/api/#ignore-annotations
  // see https://terser.org/docs/api-reference#minify-options
  // ----------------------------------------------------------
  // 注释掉以下代码将使用 esbuild 进行打包, esbuild 打包相对会快些
  // ==========================================================
  /* 
  if (options.isBuild && options.mode == 'production') {
    buildAPP.minify = 'terser';
    buildAPP.terserOptions = {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.*']
      }
    };
  }
  //*/

  // 打包独立模块配置示例(供远程调用，实验性阶段)
  if (process.env.npm_lifecycle_event == 'comp:dev' || process.env.npm_lifecycle_event == 'comp:pro') {
    buildAPP = {
      minify: options.mode == 'production', //是否压缩
      cssCodeSplit: true, // 将组件的 style 打包到 js 文件中
      outDir: './src/assets/js/async-components',
      lib: {
        formats: ['umd'],
        entry: resolve(options.path.root, './async-components/index.js'),
        name: '[name]',
        fileName: (format: any) => `index.${version}.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    };
  }

  return buildAPP;
};
