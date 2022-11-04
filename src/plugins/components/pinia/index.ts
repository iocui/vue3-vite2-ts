/**
 * -------------------------------------------------------
 * 轻量级状态管理库，支持持久化 see https://pinia.vuejs.org/
 * -------------------------------------------------------
 */

import { createPinia, PiniaVuePlugin } from 'pinia';

// import piniaPluginPersist from 'pinia-plugin-persist'; // 有BUG待原作者更新再决定是否使用原方法

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 重写插件 pinia-plugin-persist 的 piniaPluginPersist 方法
// 插件说明 see https://seb-l.github.io/pinia-plugin-persist
// BUG说明: 多布局切换路由即时返回，更新状态后立马F5刷新页面，状态无法记忆
// ------------------------------------------------------------------
import type { PiniaPluginContext } from 'pinia';
import { updateStorage, type PersistStrategy } from 'pinia-plugin-persist';
const piniaPluginPersist = ({ options, store }: PiniaPluginContext) => {
  let _a, _b, _c, _d;
  if ((_a = options.persist) == null ? void 0 : _a.enabled) {
    const defaultStrat = [{ key: store.$id, storage: sessionStorage }];
    const strategies = ((_c = (_b = options.persist) == null ? void 0 : _b.strategies) == null ? void 0 : _c.length)
      ? (_d = options.persist) == null
        ? void 0
        : _d.strategies
      : defaultStrat;
    strategies &&
      strategies.forEach((strategy: PersistStrategy) => {
        const storage = strategy.storage || sessionStorage;
        const storeKey = strategy.key || store.$id;
        const storageResult = storage.getItem(storeKey);
        if (storageResult) {
          store.$patch(JSON.parse(storageResult));
          updateStorage(strategy, store);
        }
      });
    store.$subscribe(
      () => {
        strategies &&
          strategies.forEach((strategy: PersistStrategy) => {
            updateStorage(strategy, store);
          });
      },
      { detached: true } //修复 BUG 处
    );
  }
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default (app: any) => {
  const pinia = createPinia();

  // [数据持久化插件](https://seb-l.github.io/pinia-plugin-persist/)
  pinia.use(piniaPluginPersist);

  // 同一配置使Pinia兼容vue2 & vue3写法
  if (parseInt(app.version) > 2) {
    return app.use(pinia);
  } else {
    app.use(PiniaVuePlugin);
    return { pinia };
  }
};
