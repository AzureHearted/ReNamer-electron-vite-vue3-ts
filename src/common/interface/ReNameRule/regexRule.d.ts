import type { ReNameRuleBase } from './base'

/** "正则表达"规则 */
export interface ReNameRegexRuleAll extends ReNameRuleBase {
  type: 'regex'
  /** 正则表达式 */
  regex: string
  /** 替换表达式 */
  replaceTo: string
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配 */
  isExactMatch: boolean
}

export type TReNameRegexRule = ReNameRegexRuleAll
