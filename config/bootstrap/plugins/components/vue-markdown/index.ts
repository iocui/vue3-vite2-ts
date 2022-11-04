/**
 * =========================================================================
 * 扩展插件作用：实现Markdown文件直接用作Vue组件
 * =========================================================================
 * vite help https://github.com/antfu/vite-plugin-vue-markdown
 */

import Markdown from 'vite-plugin-vue-markdown';
import { version as vueVersion } from 'vue/package.json';

const isVue2 = vueVersion.split('.')[0] === '2';

export default Markdown({
  vueVersion: isVue2 ? '2.0.0' : '3.2.0',
  markdownItSetup(md) {
    /* 使用prism插件突出显示代码块, 高亮粒度比highlightjs很细，但需要标识代码类型 */
    md.use(require('markdown-it-prism'), { defaultLanguageForUnknown: 'js', defaultLanguageForUnspecified: 'js' });

    /* 使用highlightjs插件突出显示代码块, 带有自动识别代码类型，需自行安装依赖: yarn add -D markdown-it-highlightjs */
    // md.use(require('markdown-it-highlightjs'))

    // 更多markdown-it插件 see https://www.npmjs.com/search?q=keywords:markdown-it-plugin
    //.....
  },
  transforms: {
    // vue2时需要处理一下组件导入
    after: (code: string, id: string) => {
      if (isVue2) {
        code = `<script setup>import MarkdownCodeBox from '@/components/markdown-code-box/index.vue';export default {components:{MarkdownCodeBox}}</script>${code}`;
      }
      return code;
    }
  },
  frontmatter: true, // 是否解析 md文件 frontmatter 为 vue 组件的 props
  headEnabled: false, // 是否结合 useHead 插件自动配置页面标题信息, useHead 暂不支持 vue2
  wrapperClasses: 'markdown-body', // md模板外层包裹样式
  wrapperComponent: 'markdown-code-box' //重新封装组件实现代码行号与代码复制
});
