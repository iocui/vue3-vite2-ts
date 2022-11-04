// =========================================================================
// [CSS 按需自动生成](https://www.npmjs.com/package/vite-plugin-windicss)
// =========================================================================
// 不要配置 transformCSS 为 'pre' 否则打包时不需要生成Sourcemap时存在 WARN 警告
// WARN: Sourcemap is likely to be incorrect: a plugin (vite-plugin-windicss:css)
// =========================================================================

import WindiCSS from 'vite-plugin-windicss';

export default WindiCSS({
  transformCSS: true,
  configFiles: [`${__dirname}/windi.config.ts`]
});
