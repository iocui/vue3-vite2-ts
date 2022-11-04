/**
 * 功能：让文本框获得焦点并填充默认内容
 *
 * Demo: <input type="text" v-focus v-default />
 */

import type { App } from 'vue';

export const demo = (app: App) => {
  app.directive('default', {
    mounted(el: HTMLInputElement) {
      el.placeholder = '请输入内容';
    }
  });
};

export default (app: App) => {
  app.directive('focus', {
    mounted(el: HTMLInputElement) {
      el.focus();
    }
  });
};
