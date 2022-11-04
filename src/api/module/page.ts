/** 分页示例接口模型 */
import api, { METHOD, type IDataType } from '@/api';

// 请求参数类型声明
interface IPageParams {
  /** 分页码 */
  page?: number;
  /** 每页条数 */
  limit?: number;
}

/** 接口响应数据类型 */
type Data = {
  /** 总条数 */
  total: number;
} & IDataType<
  {
    /** 编号 */
    id: number;
    /** 姓名 */
    name: string;
    /** 工作 */
    job: string;
  }[]
>;

/** 对外输出接口数据 */
export function UserPage() {
  return api.usePage<Data, [IPageParams, string?]>({
    url: 'https://61273138c2e8920017bc0b3c.mockapi.io/api/users',
    method: METHOD.GET
  });
}
