import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosInterceptors<T = AxiosResponse> {
  requestFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestRejected?: (error: any) => any;
  responseFulfilled?: (res: T) => T;
  responseRejected?: (error: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AxiosInterceptors<T>;
}

// 请求状态码
export const showStatus = (status: number, msg: string) => {
  const { t } = useLang();
  let message = '';
  switch (status) {
    case 400:
      message = t('server.errMsg400');
      break;
    case 401:
      message = t('server.errMsg401');
      break;
    case 403:
      message = t('server.errMsg403');
      break;
    case 404:
      message = t('server.errMsg404');
      break;
    case 405:
      message = t('server.errMsg405');
      break;
    case 408:
      message = t('server.errMsg408');
      break;
    case 500:
      message = t('server.errMsg500');
      break;
    case 501:
      message = t('server.errMsg501');
      break;
    case 502:
      message = t('server.errMsg502');
      break;
    case 503:
      message = t('server.errMsg503');
      break;
    case 504:
      message = t('server.errMsg504');
      break;
    case 505:
      message = t('server.errMsg505');
      break;
    default:
      message = msg ?? t('server.errMsg502');
  }
  return `${message}(${status}), ${t('server.errMsgTip')}`;
};
