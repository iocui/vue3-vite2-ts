/**
 * ==================================================================
 * Vite 定义全局常量静态替换 see https://cn.vitejs.dev/config/#define
 * ------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao) License MIT
 * ==================================================================
 */
import { version } from '../../../package.json';
import dayjs from 'dayjs';

export default (options: viteUserOptions) => {
  // ***********************************************************
  // VUE 项目里的 __APP__ 全局变量赋值, 不建议曝露太多变量，不太安全
  // -----------------------------------------------------------
  // 增加了变量，需先转到 AppEnv 类型定义文件中相应添加变量声明方可用
  // ***********************************************************
  const __APP__: AppEnv = {
    version: version || '1.0.0',
    buildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  };

  return { __APP__: JSON.stringify(__APP__) };
};
