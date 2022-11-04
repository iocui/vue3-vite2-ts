/**
 *  vueRequest全局配置，更多See https://www.attojs.com/api/#manual
 */
import { setGlobalOptions } from 'vue-request';

setGlobalOptions({
  //当 manual 设置为 true 时，你需要手动触发 run 才会发起请求
  manual: true,

  // 防抖，指定200毫秒时间内的请求只发一次
  debounceInterval: 200,

  // loading延迟值: 请求响应大于100毫秒时才会显示loading
  // loadingDelay: 100,

  // 让 loading 持续500毫秒时间
  // loadingKeep: 500,

  // 是否在浏览器窗口触发 focus 和 visibilitychange 时，会重新发起请求
  // refreshOnWindowFocus: true,

  // 浏览器窗口触发间隔的毫秒数
  // refocusTimespan: 3000,

  // 分页器参数名定义
  pagination: {
    currentKey: 'page', // 页码参名
    pageSizeKey: 'limit', // 每页条数参名
    totalKey: 'total' // 后端返回总条数变量名
  }
});

export {};
