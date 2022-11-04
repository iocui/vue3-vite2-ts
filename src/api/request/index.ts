/**
 * axios封装类，通常这个类不需要作必要的修改配置，修改配置应在实例化它时做
 * ===================================================================
 * axios see https://axios-http.com/zh/
 * vue-request see https://www.attojs.com/guide/introduction.html
 * ===================================================================
 * 支持防抖/节流/锁重/断网重连
 * 可拦截重复请求，取其最新请求结果作为数据源
 * 支持get/post等多种请求方式，支持自定义headers
 */
import { showStatus, type RequestConfig } from './type';
import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from 'axios';
import { useRequest, usePagination, type Service, type Options, type PaginationOptions } from 'vue-request';

class Request {
  // 原生 axios 实例对象
  axios: AxiosInstance;

  // 常用接口请求方式
  method = {
    /** put方式请求 */
    PUT: 'put',
    /** delete方式请求 */
    DELETE: 'delete',
    /** get方式请求 */
    GET: 'get',
    /** post方式请求 */
    POST: 'post'
  };

  // 常用请求体格式
  contentType = {
    /** 默认的格式请求体中的数据会以json字符串格式的数据发送到后端 */
    JSON: 'application/json',
    /** 它会将请求参数用 key1=val1&key2=val2 的方式进行组织，并放到请求实体里面，注意不支持上传文件，一般用于普通表单提交 */
    FORM: 'application/x-www-form-urlencoded',
    /** 它会将请求体的数据处理为一条消息，以标签boundary为单元，用分隔符分开。既可以上传键值对，也可以上传文件 */
    DATA: 'multipart/form-data',
    /** 与application/json类似，会以xml字符串格式的数据发送到后端 */
    XML: 'application/xml'
  };

  // 类私有方法, 整合 axios 和 useRequest 的传参
  private formatRequest<R, P extends unknown[] = any>(config: RequestConfig<R>, args: P) {
    const data = args.length > 0 ? args[0] : undefined;
    const params = args.length > 1 ? args[1] : undefined;
    if (config.method?.toLowerCase() == 'get') {
      if (typeof data == 'object') {
        if (config.params) {
          config.params = Object.assign(config.params, data);
        } else {
          config.params = data;
        }
      }
    } else {
      if (typeof data == 'object') {
        if (config.data) {
          config.data = Object.assign(config.data, data);
        } else {
          config.data = data;
        }
      }
      if (typeof params == 'object') {
        if (config.params) {
          config.params = Object.assign(config.params, params);
        } else {
          config.params = params;
        }
      }
    }
    return this.request<R>({ ...config });
  }

  // 构造函数会在对象创建时执行
  constructor(config: RequestConfig) {
    // 初始化axios实例
    this.axios = axios.create(config);

    // 注册实例的拦截器
    this.axios.interceptors.request.use(config.interceptors?.requestFulfilled, config.interceptors?.requestRejected);
    this.axios.interceptors.response.use(config.interceptors?.responseFulfilled, config.interceptors?.responseRejected);

    // 注册全局请求拦截器
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig<any>) => {
        // 防止GET请求缓存而追加时间戳
        if (config.method?.toUpperCase() === 'GET') {
          config.params = { ...config.params, _t: new Date().getTime() };
        }

        const ContentType = (config?.headers && 'Content-Type' in config.headers ? config.headers['Content-Type'] : '') as string;

        // 防止后端无法获取传统表单POST参数
        if (typeof config.data == 'object' && ContentType.toLowerCase().includes(this.contentType.FORM)) {
          //亦可用 import qs from 'qs' 依赖进行处理
          //config.data = qs.stringify(config.data)

          //直接对象格式化处理
          config.data = Object.keys(config.data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(config.data[key]))
            .join('&');
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // 注册全局响应拦截器
    this.axios.interceptors.response.use(
      (res: any) => {
        //发生错误返回错误信息
        if (axios.isAxiosError(res)) {
          return Promise.reject(res);
        }
        if ('status' in res && res.status !== 200) {
          const status = res.status || 0;
          res.message = showStatus(status, '');
          return Promise.reject(res);
        }
        //返回成功的响应数据
        return res.data;
      },
      (error: AxiosError) => {
        //取消请求，不报错并返回空值
        if (axios.isCancel(error)) {
          return;
        }
        //处理http错误，抛到业务代码
        if (axios.isAxiosError(error)) {
          const status = error.request.status || 0;
          if (status == 0 || status == 500) {
            return new Promise((resolve, reject) => {
              const img = new Image();
              //临时判断网络是否通畅
              img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
              img.onload = function () {
                error.message = showStatus(status, error.message);
                reject(error);
              };
              img.onerror = function () {
                error.message = 'The network is disconnected';
                reject(error);
              };
            });
          }

          error.message = showStatus(status, error.message);
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  // 二次封装 axios 的 request 方法
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestFulfilled) {
        config = config.interceptors.requestFulfilled(config);
      }
      this.axios
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseFulfilled) {
            res = config.interceptors.responseFulfilled(res);
          }
          resolve(res);
        })
        .catch(err => {
          if (config.interceptors?.responseRejected) {
            err = config.interceptors.responseRejected(err);
          }
          reject(err);
        });
    });
  }

  // usePagination分页请求库二次封装
  usePagination<R, P extends unknown[] = any>(service: Service<R, P>, options?: PaginationOptions<R, P>) {
    return usePagination<R, P>(
      service,
      Object.assign(
        {
          defaultParams: [
            {
              page: 1,
              limit: 30
            }
          ]
        },
        options
      )
    );
  }

  // useRequest请求库二次封装
  useRequest<R, P extends unknown[] = any>(service: Service<R, P>, options?: Options<R, P>) {
    return useRequest<R, P>(service, options);
  }

  // 整合 axios 和 usePagination
  usePage<R, P extends unknown[] = any>(config: RequestConfig<R>) {
    return {
      run: (options?: PaginationOptions<R, P>) => {
        const _Service: Service<R, P> = (...args: P) => {
          return this.formatRequest<R, P>(config, args);
        };
        return this.usePagination<R, P>(_Service, options);
      }
    };
  }

  // 整合 axios 和 useRequest
  use<R, P extends unknown[] = any>(config: RequestConfig<R>) {
    return {
      run: (options?: Options<R, P>) => {
        const _Service: Service<R, P> = (...args: P) => {
          return this.formatRequest<R, P>(config, args);
        };
        return this.useRequest<R, P>(_Service, options);
      }
    };
  }

  //jsonp拓展
  jsonp(url: string, callback?: string) {
    return new Promise(resolve => {
      //@ts-ignore
      window.jsonCallBack = result => resolve(result);
      callback = callback || 'callback';
      const JSONP = document.createElement('script');
      JSONP.type = 'text/javascript';
      JSONP.src = `${url}&${callback}=jsonCallBack`;
      JSONP.async = true;
      document.getElementsByTagName('head')[0].appendChild(JSONP);
      setTimeout(() => {
        document.getElementsByTagName('head')[0].removeChild(JSONP);
      }, 500);
    });
  }
}

export default Request;
