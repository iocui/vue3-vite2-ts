/** 后端仿真模拟数据(仅供开发) */
import type { MockMethod } from 'vite-plugin-mock';

// [定义示例](http://mockjs.com/examples.html)
const dataTemplate = {
  'list|20': [
    {
      origin: '@ip',
      address: '@county(true)'
    }
  ]
};

export default [
  {
    url: '/test',
    method: 'post', //指定请求方式
    response: () => {
      return {
        code: 200,
        message: 'Succeed',
        data: dataTemplate
      };
    }
  }
] as MockMethod[];
