/**
 * =========================================================================
 * 扩展插件作用：检查 Vite 插件的中间状态。用于调试和创作插件。
 * =========================================================================
 * vite help https://www.npmjs.com/package/vite-plugin-inspect
 */

export default (options: viteUserOptions) => {
  if (!options.envs?.VITE_APP_PLUGIN_INSPECT || options.isBuild) return;
  return require('vite-plugin-inspect').call(null);
};
