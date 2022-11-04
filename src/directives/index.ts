/** 自动安装全局自定义的vue指令，指令导入文件支持多种写法 */

import type { App, Directive } from 'vue';

export default function setupDirectives(app: App) {
  const directiveList: Record<string, any> = import.meta.glob('./components/*.ts', { eager: true });
  Object.keys(directiveList).forEach(async keys => {
    const module = directiveList[keys];
    Object.keys(module).forEach(async attr => {
      if (typeof module[attr] === 'function') {
        // 使用[函数方式]注入VUE指令 (指令名由函数内的 app.directive 第一个参数决定)
        await module[attr](app);
      } else {
        if ('mounted' in module[attr]) {
          if (attr == 'default') {
            // 使用[默认导出方式]注入VUE指令 (指令名为文件名)
            const directiveKey = keys.replace(/(.*\/)*([^.]+).*/gi, '$2') as string;
            app.directive(directiveKey, module.default as Directive<any, any>);
          } else {
            // 使用[命名导出方式]注入VUE指令 (指令名为所对应的导出属性名)
            app.directive(attr, module[attr] as Directive<any, any>);
          }
        }
      }
    });
  });
}
