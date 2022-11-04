import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default (options: viteUserOptions) => {
  return [
    // 官方VUE模板解析器增加支持md文件解析
    vue({ include: [/\.vue$/, /\.md$/] }),

    // [Jsx支持](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)
    vueJsx(),

    // [script setup use name for SFC](https://github.com/vbenjs/vite-plugin-vue-setup-extend)
    vueSetupExtend()
  ];
};
