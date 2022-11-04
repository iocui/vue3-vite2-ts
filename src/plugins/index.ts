/**
 * =================================================
 * Vue3 自动从components目录引入第三方组件导入装载进项目
 * -------------------------------------------------
 * 每个插件 app.use 方法需封装在components的各子目录内
 * -------------------------------------------------
 * Author: 曹操<pgcao@qq.com>
 * HomePage: https://gitee.com/pgcao/vue3-vite2-ts
 * =================================================
 */
import type { App } from '@/plugins/types';

export default async (app: App, callbackfn: () => void) => {
  /* @__PURE__ */
  const copyright_common_style = 'padding:2px 8px;font-size:14px;color:#fff;';
  /* @__PURE__ */
  const copyright_main_style = `${copyright_common_style} background: #ffae00;`;
  /* @__PURE__ */
  const copyright_sub_style = `${copyright_common_style} background: #41b883;`;
  /* @__PURE__ */ //esbuild打包编译时移除
  console.info(`%cPowered by vite%cvue-${app.version} plugins done`, copyright_main_style, copyright_sub_style);

  console.time('pluginsLoad');

  // 批量装载VUE项目所需组件插件, 即 app.use('xxx') 的东西，每个子目录为一个依赖
  // const pluginList = import.meta.globEager('./components/*/index.ts'); // vite3+ 将弃用globEager
  const pluginList: Record<string, any> = import.meta.glob('./components/*/index.ts', { eager: true });

  Object.values(pluginList).forEach(async module => {
    if (typeof module.default === 'function') {
      await module.default(app);
    }
  });

  console.timeEnd('pluginsLoad');

  // 自动装载完成所有插件后再实例化到DOM
  callbackfn.call(null);
};
