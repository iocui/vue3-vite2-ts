// service 实例化统一出口
import axios, { type AxiosRequestHeaders } from 'axios';
import { BASE_URL, TIME_OUT, HEADERS, TOKEN_NAME } from '@/config/server';
import AxiosRequest from './request';

// 用于存储请求的标识，便于路由切换时取消请求(仅取消请求不返回响应，并不会截断响应，即前端取消了请求, 实质后端还是会响应的)
const cancelTokenStore: any = {
  source: {
    token: null,
    cancel: null
  }
};

/**
 * 实例化AxiosRequest
 */
const axiosRequest = new AxiosRequest({
  baseURL: BASE_URL || '', //全局URL根 */
  timeout: TIME_OUT || 0, // 超时时间，单位毫秒

  // withCredentials: true, //注意：允许跨域携带cookie设为true时，后端 Access-Control-Allow-Origin 不能设置为 " * ", 必须指定请求来源地址

  // 配置本实例拦截器
  interceptors: {
    requestFulfilled: config => {
      const { t } = useLang();

      config.timeoutErrorMessage = t('server.timeout');
      config.cancelToken = cancelTokenStore.source.token;

      config.headers = Object.assign(config.headers as AxiosRequestHeaders, HEADERS);

      // 携带token传值给Authorization
      if (localStorage.getItem('token')) {
        config.headers[TOKEN_NAME] = localStorage.getItem('token') as string;
      }

      return config;
    },
    requestRejected: err => {
      return Promise.reject(err);
    },

    responseFulfilled: res => {
      return res;
    },
    responseRejected: err => {
      return Promise.reject(err);
    }
  }
});

/**
 * 清空本实例所有请求（通常在路由跳转时调用）
 */
export const clearAllPending = () => {
  const CancelToken = axios.CancelToken;
  cancelTokenStore.source.cancel && cancelTokenStore.source.cancel();
  cancelTokenStore.source = CancelToken.source();
};

/** 常用接口请求方式 */
export const METHOD = axiosRequest.method;

/** 通用标准接口格式, 可修改适合你的后端接口格式 */
export interface IDataType<T = any> {
  code: number;
  message?: string;
  data: T;
  [key: string]: any;
}

export default axiosRequest;
