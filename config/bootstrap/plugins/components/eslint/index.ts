/**
 * =========================================================================
 * 扩展插件作用：将eslint错误信息显示在浏览器界面上
 * -------------------------------------------------------------------------
 * 需要用到的开发依赖：
 * =========================================================================
    "@typescript-eslint/eslint-plugin@^5.12.1"
    "@typescript-eslint/parser@^5.12.1"
    "@vue/eslint-config-prettier@^7.0.0"
    "@vue/eslint-config-typescript@^10.0.0"
    "eslint@^8.9.0"
    "eslint-plugin-prettier@^4.0.0"
    "eslint-plugin-vue@^8.5.0"
    "vite-plugin-eslint@^1.3.0"
 * =========================================================================
 * view help https://www.npmjs.com/package/vite-plugin-eslint
 */
import eslintPlugin from 'vite-plugin-eslint';

export default eslintPlugin({
  /* 推荐使用项目根下的 .eslintignore 配置忽视文件，无需在此自定义 */
  // exclude: ['/config/', '/dist/', './node_modules/**', '/public/', '.vscode', '.idea'],

  /* 在 lining 时要检测的包括单个文件或文件数组，这里使用默认即可，无需自定义 */
  // include: ['src/**/*js', 'src/**/*jsx', 'src/**/*ts', 'src/**/*tsx', 'src/**/*vue'],

  /* 是否开启缓存来减少eslint执行时间 */
  cache: true
});
