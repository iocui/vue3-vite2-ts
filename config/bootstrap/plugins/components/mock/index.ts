/**
 * =========================================================================
 * 扩展插件作用：开发与生产同时使用mock虚拟数据服务
 * =========================================================================
 * 打包生产环境使用时存在 WARN 警告，未解决
 * WARN 警告: Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification
 * =========================================================================
 * vite help https://github.com/vbenjs/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export default (options: viteUserOptions) => {
  // 真实的生产项目打包时请关闭，会影响打包体积
  const prodMock = options.envs.VITE_APP_USE_MOCK || false;

  return viteMockServe({
    mockPath: 'src/api/mock',
    localEnabled: options.command === 'serve',
    prodEnabled: options.command !== 'serve' && prodMock,
    // 这样可以控制关闭mock的时候不让mock打包到最终代码内
    injectCode: `import { setupProdMockServer } from './api/mock/_mockProdServer';setupProdMockServer();`,
    ignore: (fileName: string) => {
      if (fileName.includes('_mockProdServer')) {
        return false;
      }
      return true;
    },
    // 是否在控制台上显示请求日志
    logger: true
  });
};
