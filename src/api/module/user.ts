import api, { type IDataType } from '@/api';

// 请求参数类型声明
interface ITestParams {
  /** 传入用户组别 */
  type: string;
}

/** 返回参数类型声明 */
interface ITestResult {
  /** 编号 */
  id: number;
  /** 密匙 */
  token: string;
  /** 姓名 */
  name: string;
}

// 接口枚举
enum ApiUrl {
  test = '/user'
}

//form json data
export function jsonApi() {
  return api.use<IDataType<ITestResult>, [ITestParams]>({
    url: ApiUrl.test,
    method: api.method.POST
  });
}

//模仿 form 表单提交，使PHP后端可以用原生POST取值
export const formApi = (data?: ITestParams) =>
  api.use<IDataType<ITestResult>, [ITestParams]>({
    url: ApiUrl.test,
    method: api.method.POST,
    headers: {
      'Content-Type': api.contentType.DATA
    },
    data
  });
