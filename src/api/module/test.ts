/** 接口模型(后端通讯接口模型) */
import api, { METHOD, type IDataType } from '@/api';

// 请求参数类型声明
interface ITestParams {
  /** 账号 */
  username: string;
  /** 密码 */
  password: string;
}

// 返回参数类型声明
interface ITestResult {
  /** 列表数据 */
  list: {
    /** IP地址 */
    origin: string;
    /** 行政地址 */
    address: string;
  }[];
}

export const testApi = (data?: ITestParams) => {
  return api.use<IDataType<ITestResult>, [ITestParams]>({
    url: '/test',
    method: METHOD.POST,
    data
  });
};
