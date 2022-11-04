/**
 * ====================================================================
 * Vite 开发服务器配置选项 see https://cn.vitejs.dev/config/#server-host
 * --------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao) License MIT
 * ====================================================================
 */
import type { ServerOptions } from 'vite';

export default (options: viteUserOptions) => {
  const server: ServerOptions = {
    host: '0.0.0.0'
  };

  // 为开发服务器配置代理请求，无跨域问题, 与生产环境无关
  if (options.envs.VITE_APP_API_URL) {
    server.proxy = {
      // 要使用本地代理，在 src/config/server.ts 文件修改 BASE_URL = '/apiproxy'
      '/apiproxy': {
        target: options.envs.VITE_APP_API_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/apiproxy/, '')
      }
    };
  }

  if (options.envs.VITE_HTTP_PORT) {
    server.port = options.envs.VITE_HTTP_PORT;
  }

  return server;
};
