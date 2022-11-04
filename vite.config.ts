/**
 * ==============================================================
 * 配置项 build/plugins/server 已分离到 config/bootstrap 中独立管理
 * --------------------------------------------------------------
 * 其他配置项都可以在这里添加，详情参考 https://vitejs.dev/config/
 * ==============================================================
 */

import configBootstrap from './config/bootstrap';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(async config =>
  configBootstrap(config, {
    envPrefix: 'VITE_',
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
        '~/': `${resolve(__dirname, 'src')}/`,
        '~@/': `${resolve(__dirname, 'config/modules')}/`,
        // 解除警告 You are running the esm-bundler build of vue-i18n
        'vue-i18n': `vue-i18n/dist/vue-i18n.cjs.js`
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vueuse/core', 'vue-request']
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false }
      }
    }
  })
);
