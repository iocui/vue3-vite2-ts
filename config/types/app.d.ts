// VUE 项目里的 __APP__ 全局变量类型声明, 不建议曝露太多变量，不太安全
declare interface AppEnv {
  /** 框架版本，由 package.json 的 version 决定 */
  readonly version: string;
  /** 构建时间，由 dayjs 决定 */
  readonly buildTime: string;
}
