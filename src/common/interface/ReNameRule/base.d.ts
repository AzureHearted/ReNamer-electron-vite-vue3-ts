/** 重命名规则基础接口 */
export interface ReNameRuleBase {
  /** 规则id */
  readonly id: string
  /** 是否启用规则 */
  enable: boolean
  /** 规则类别 */
  // type: 'remove' | 'fill' | 'replace' | 'insert' | 'serialize' | 'regex' | 'extension'
  /** 忽略扩展名 */
  ignoreExt: boolean

  [key: string]: any
}
