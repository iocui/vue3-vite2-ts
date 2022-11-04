/**
 * =========================================================================
 * 扩展插件作用：vue模块自动化按需引入，源码来源 https://github.com/antfu
 * ----------------------------------------------------------------------
 * 支持以下模块自动引用，无需再使用 import * from ***
 * NaiveUi、AntDesign、Element、pinia、vue-composition-api、vue-i18n、vue-router、@vueuse/core等...
 * 当然，你习惯手工引用也是可以的，并且开发界面项目建议使用 NaiveUi 框架，真心不错
 * =========================================================================
 */
import { resolve } from 'path';
import { version as vueVersion } from 'vue/package.json';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { vue2Imports, vue3Imports, AutoResolvers } from './vueuse-core';

export default (options: viteUserOptions) => {
  const isVue2 = parseInt(vueVersion) < 3;

  return [
    // [按需自动导入](https://www.npmjs.com/package/unplugin-auto-import)
    AutoImport({
      dts: resolve(options.path.root, './config/types/auto-imports.d.ts'),
      dirs: [resolve(options.path.root, './src/stores'), resolve(options.path.root, './src/hooks')],
      imports: isVue2 ? vue2Imports : vue3Imports,
      resolvers: AutoResolvers(),
      // 解决eslint报错
      eslintrc: {
        enabled: true, // Default `false` 为true时，会根据filepath生成一个eslint的配置文件, 这个文件需要引入到eslint的配置文件中
        filepath: resolve(options.path.root, './.vscode/.eslintai.json'), // Default `./.eslintai.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),

    // [组件按需自动引入](https://www.npmjs.com/package/unplugin-vue-components)
    Components({
      directives: isVue2 ? false : true,
      transformer: isVue2 ? 'vue2' : 'vue3',
      include: isVue2 ? [] : [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      extensions: ['vue', 'md', 'tsx'],
      dts: resolve(options.path.root, './config/types/components.d.ts'),
      resolvers: [
        IconsResolver({
          //标识在 config/bootstrap/plugins/components/icons/index.ts 文件配置
          componentPrefix: 'Icons', // 图标标签别名前缀
          customCollections: ['svg'] // 跟随前缀自定义集合标识
        }),
        ...AutoResolvers()
      ]
    })
  ];
};
