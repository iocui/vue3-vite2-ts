/**
 * ==============================================================
 * 此插件为在为生产而构建时不支持本机 ESM 的旧版浏览器提供支持
 * --------------------------------------------------------------
 * 注意：VUE3不再支持IE11, 如果需要IE11支持，请使用VUE2-VITE-TS脚手架
 * --------------------------------------------------------------
 * see https://www.npmjs.com/package/@vitejs/plugin-legacy
 * ==============================================================
 */
import legacy from '@vitejs/plugin-legacy';
import { version as vueVersion } from 'vue/package.json';

export default (options: viteUserOptions) => {
  //return false; //可强制临时停用插件，vue3 不再支持IE

  if (!options.isBuild || !options.envs.VITE_APP_LegacyIE) {
    return false;
  }

  const legacyOptions =
    parseInt(vueVersion) < 3
      ? {
          targets: ['> 1%, last 1 version, ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11+时需要此插件
        }
      : {
          targets: ['> 1%, last 1 version', 'not IE 11'] // 注意：VUE3不再支持IE11
        };

  return legacy(legacyOptions);
};
