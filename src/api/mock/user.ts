/** 后端仿真模拟数据(仅供开发) */
import type { MockMethod } from 'vite-plugin-mock';

// [定义示例](http://mockjs.com/examples.html)
const dataTemplate = {
  id: '@id',
  token: '@guid',
  name: '@cname'
};

export default [
  {
    url: '/user',
    method: 'post',
    timeout: 1000, //模拟延时1秒
    response: () => {
      return {
        code: 200,
        message: 'Succeed',
        data: dataTemplate
      };
    }
  }
] as MockMethod[];
