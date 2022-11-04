/**
 * =========================================================================
 * 扩展插件作用：实现vue自动化路由与布局
 * ----------------------------------------------------------------------
 * 读取 src/views 文件夹下的vue文件,生成vue-router的路由信息
 * 结合 src/layouts 布局文件进行自动化生成vue-router路由布局
 * =========================================================================
 */
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default [
  // [基于文件系统的Vite路由生成器](https://github.com/hannoeru/vite-plugin-pages)
  Pages({
    //要生成路由的目标目录
    dirs: [
      { dir: 'src/views', baseRoute: '' },
      { dir: 'src/extends/**/views', baseRoute: 'extends' }
    ],
    //需要生成路由的文件后缀
    extensions: ['vue', 'md', 'tsx'],
    //忽略的目录
    exclude: ['**/components/**'],
    //是否使用Nuxt.js风格的路由命名
    nuxtStyle: false
  }),

  // [自动化路由布局](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
  Layouts({
    //默认布局文件目录位置，增删布局文件会自动重启vite
    layoutsDirs: 'src/layouts',
    //默认布局
    defaultLayout: 'default'
  })
];
