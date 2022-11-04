/** 请求超时值, 超过该毫秒后端若未能响应将提示超时 */
const TIME_OUT = 10000;

/** 要使用本地代理，修改 BASE_URL = '/apiproxy' 方便开发时跨域代理到 import.meta.env.VITE_APP_API_URL */
// const BASE_URL = '/apiproxy'; // 务必 import.meta.env.VITE_APP_API_URL 的值是跨域URL方建议使用代理
const BASE_URL = import.meta.env.VITE_APP_API_URL;

/** 定义全局 headers 参数 */
const HEADERS = {
  // 仅用于生产演示数据接口token, 正式项目可删掉
  'app-token': '$2a$10$QwOCa08tZXDrgMDVCKO8x.Wcogcw1pNXwAde3Xl6I61v6gRMl6V2m'
};

/** 接口请求 token 键名 */
const TOKEN_NAME = 'token';

/** 导出接口请求配置 */
export { BASE_URL, TIME_OUT, HEADERS, TOKEN_NAME };
