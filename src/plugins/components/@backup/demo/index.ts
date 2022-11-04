/**
 * ----------------------------------------------------
 * 这是一个 vue 插件演示
 * ----------------------------------------------------
 */

import type { App } from '@/plugins/types';

export default (app: App) => {
  const showVersion = {
    install: (app: App, options: any) => {
      /* @__PURE__ */
      options.debug && console.log('vue' + app.version, options);
    }
  };
  app.use(showVersion, { debug: false });
};
