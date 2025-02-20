import type { ReNameRuleBase } from './base'

/** "删除"规则 (全参数) */
export interface ReNameRemoveRuleAll extends ReNameRuleBase {
  type: 'remove'
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'all' | 'first' | 'last'
  /** 忽略大小写 (当 anchorText | startText | endText 生效时, 也会对其生效) */
  ignoreCase: boolean
  /** 全字匹配 (当 anchorText | startText | endText 生效时, 也会对其生效) */
  isExactMatch: boolean
}

export type TReNameRemoveRule = ReNameRemoveRuleAll
