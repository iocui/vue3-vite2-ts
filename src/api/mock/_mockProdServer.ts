//  mockProdServer.ts 生产环境使用演示数据, 使用此数据浏览器将无实质HTTP请求
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 逐一手动配置
// import goodsMock from './goods';
// import testMock from './test';
// export const mockModules = [...goodsMock, ...testMock];

// 批量载入配置
const mockModules: Array<string> = [];
const modules: Record<string, any> = import.meta.glob('./*.ts', { eager: true });
Object.keys(modules).forEach(key => {
  if (key.includes('/_mockProdServer')) return;
  mockModules.push(...modules[key].default);
});
console.log(mockModules);

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
