/** 重命名规则基础接口 */
export interface ReNameRuleBase {
  type: 'remove' | 'fill' | 'replace' | 'insert' | 'serialize' | 'regex' | 'extension'
  /** 忽略扩展名 */
  ignoreExt: boolean
}
