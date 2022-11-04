// =========================================================================
// [按需加载组件样式](https://www.npmjs.com/package/vite-plugin-style-import)
// =========================================================================
import fs from 'fs';
import { createStyleImportPlugin, AndDesignVueResolve, VantResolve, ElementPlusResolve, NutuiResolve, AntdResolve } from 'vite-plugin-style-import';

export default (options: viteUserOptions) => {
  return createStyleImportPlugin({
    resolves: [
      // 已有的解决方案，组件样式按需加载
      AndDesignVueResolve(),
      VantResolve(),
      ElementPlusResolve(),
      NutuiResolve(),
      AntdResolve()
    ],
    libs: [
      // 如果你没有你需要的解决方案，你可以直接定义组件样式
      {
        libraryName: 'element-ui',
        esModule: true,
        resolveStyle: name => {
          if (fs.existsSync(`${options.path.modules}theme-chalk/${name}.css`)) {
            return `theme-chalk/${name}.css`;
          }
          return '';
        }
      },
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: name => {
          if (fs.existsSync(`${options.path.modules}@arco-design/web-vue/es/${name}/style/css.js`)) {
            return `@arco-design/web-vue/es/${name}/style/css.js`;
          }
          return '';
        }
      }
    ]
  });
};
