import type { ReNameRuleBase } from './base'

/** "替换"规则 */
export interface ReNameReplaceRuleAll extends ReNameRuleBase {
  type: 'replace'
  /** 需替换的内容 */
  match: string
  /** 替换为 */
  replaceTo: string
  /** 替换范围 */
  range: 'all' | 'first' | 'last'
  /** 全字匹配 */
  isExactMatch: boolean
  /** 忽略大小写 */
  ignoreCase: boolean
}

export type TReNameReplaceRule = ReNameReplaceRuleAll
