/** 项目开发配置参数类型；可修改文件 config/.env.* */
declare interface ViteEnv {
  /** 是否调试模式 */
  readonly DEBUG: boolean;
  /** 本地服务端口 */
  readonly VITE_HTTP_PORT: number;
  /** 是否使用hash路由 */
  readonly VITE_HTTP_HASH: boolean;
  /** 是否开启插件调试 */
  readonly VITE_APP_PLUGIN_INSPECT: boolean;
  /** 是否兼容IE */
  readonly VITE_APP_LegacyIE: boolean;
  /** 是否开启生产虚拟数据 */
  readonly VITE_APP_USE_MOCK: boolean;
  /** 项目名称 */
  readonly VITE_APP_NAME: string;
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 项目描述 */
  readonly VITE_APP_DESC: string;
  /** 后端API接口请求地址 */
  readonly VITE_APP_API_URL: string;
  /** 前端URL访问地址 */
  readonly VITE_APP_BASE_URL: string;
  /** 是否开启打包压缩 */
  readonly VITE_APP_BUILD_ZIP: boolean;
  /** 打包压缩方式 */
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  //更多项目开发配置参数类型声明.........
}

/** 传递给vite插件配置的参数类型 */
declare interface viteUserOptions {
  readonly envs: ViteEnv;
  /** 是否打包 */
  readonly isBuild: boolean;
  /** 命令模式: build为打包，serve为运行 */
  readonly command: 'build' | 'serve';
  /** 运行模式: 常为开发(development)模式和生产(production)模式 */
  readonly mode: string;
  /** 项目根与依赖包根路径 */
  readonly path: {
    /** 项目根路径 */
    readonly root: string;
    /** 依赖包根路径 */
    readonly modules: string;
  };
}

/** 将项目配置参数继承给 import.meta.env */
declare interface ImportMetaEnv extends ViteEnv {
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
}
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
