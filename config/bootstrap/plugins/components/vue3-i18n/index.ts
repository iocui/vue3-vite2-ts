// [实现i18n国际化支持SFC](https://www.npmjs.com/package/@intlify/vite-plugin-vue-i18n)
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve } from 'path';

export default (options: viteUserOptions) => {
  return vueI18n({
    /**
     * 是否在生产版本中自动使用 Vue I18n 运行时方式, 默认为 true
     * 为 true 时，开发环境下需要在 vite.config.ts 中配置解除运行时提示警告
     */
    //runtimeOnly: true,

    /**
     * 如果要使用Vue I18n旧版遗留API，则需要设置“compositionOnly:false”，默认为 true
     * -------------------------------------------------------------------------------------
     * if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
     * -------------------------------------------------------------------------------------
     * 即 src\plugins\components\vue3-i18n\index.ts 中的 createI18n() 函数中的 legacy 为true时
     */
    //compositionOnly: false,

    /* 语种包根路径 */
    include: [resolve(options.path.root, './**/langs/**')]
  });
};
