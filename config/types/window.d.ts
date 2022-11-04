/**
 * 不要在该声明文件中使用 import { **** } from 'xxxx' 语法
 * 应使用 typeof import('xxxx')['****'] 来引入TS声明
 */

declare type jQuery = /*unresolved*/ any;

// 声明新的全局变量
declare const define: any;
declare const requirejs: any;
declare const __APP__: AppEnv;
declare const $t: any;
declare const $: jQuery;

// 声明新的window全局变量
declare interface Window {
  $?: jQuery;
  // 更多window全局变量声明, 不建议曝露太多全局变量，不太安全
  //...
}
