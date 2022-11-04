/**
 * ===========================================================
 * 实现在元素的 class 属性中直接合并 windicss 原子类
 * -----------------------------------------------------------
 * see https://www.npmjs.com/package/vite-plugin-windicss-elements-apply
 * ===========================================================
 */

import WindiCSSApply from 'vite-plugin-windicss-elements-apply';

export default WindiCSSApply({
  styleKey: 'css'
});
