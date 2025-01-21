import type { ReNameRuleBase } from './base'

/** "删除"规则 (全参数) */
export interface ReNameDeleteRuleAll extends ReNameRuleBase {
  type: 'delete'
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'all' | 'first' | 'last' | 'before' | 'after' | 'ltr' | 'rtl'
  /** 开始方式 (只有 range = "ltr" | "rlt" 时生效) */
  startMethod: 'index-based' | 'symbol-based'
  /** 结束方式 (只有 range = "ltr" | "rlt" 时生效) */
  endMethod: 'count-based' | 'symbol-based'
  /** 起始索引 (只有 range = "ltr" | "rlt" 且 startMethod = "index-based" 时生效) */
  startIndex: number
  /** 锚点文本 (只有 range = "before" | "after" 时生效) */
  anchorText: string
  /** 起始文本 (只有 range = "ltr" | "rlt" 且 startMethod = "symbol-based" 时生效) */
  startText: string
  /** 删除数量 (只有 range = "ltr" | "rlt" 且 endMethod = "count-based" 时生效) */
  removeCount: number
  /** 结束文本 (只有 range = "ltr" | "rlt" 且 endMethod = "symbol-based" 时生效) */
  endText: string
  /** 全字匹配 (当 anchorText | startText | endText 生效时, 也会对其生效) */
  isExactMatch: boolean
  /** 忽略大小写 (当 anchorText | startText | endText 生效时, 也会对其生效) */
  ignoreCase: boolean
}

/** 删除规则：基础规则 */
interface ReNameDeleteRuleBase extends ReNameRuleBase {
  /** 规则类型 */
  type: 'delete'
}

/** 删除规则：基于整体 */
interface ReNameDeleteRuleByOverall extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'all' | 'first' | 'last'
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于锚点前后 */
interface ReNameDeleteRuleByAnchor extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'before' | 'after'
  /** 锚点文本  */
  anchorText: string
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于方向 (全部参数)  */
interface ReNameDeleteRuleByDirectionAll extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'ltr' | 'rtl'
  /** 开始方式 (只有 range = "ltr" | "rlt" 时生效) */
  startMethod: 'index-based' | 'symbol-based'
  /** 结束方式 (只有 range = "ltr" | "rlt" 时生效) */
  endMethod: 'count-based' | 'symbol-based'
  /** 起始索引 (只有 range = "ltr" | "rlt" 且 startMethod = "index-based" 时生效) */
  startIndex: number
  /** 起始文本 (只有 range = "ltr" | "rlt" 且 startMethod = "symbol-based" 时生效) */
  startText: string
  /** 删除数量 (只有 range = "ltr" | "rlt" 且 endMethod = "count-based" 时生效) */
  removeCount: number
  /** 结束文本 (只有 range = "ltr" | "rlt" 且 endMethod = "symbol-based" 时生效) */
  endText: string
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于方向 ==> startMethod = "index-based" 且  endMethod = "count-based" */
interface ReNameDeleteRuleByDirection_StartIndexBasedAndEndCountBased extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'ltr' | 'rtl'
  /** 开始方式  */
  startMethod: 'index-based'
  /** 结束方式  */
  endMethod: 'count-based'
  /** 起始索引 */
  startIndex: number
  /** 删除数量 */
  removeCount: number
}

/** 删除规则：基于方向 ==> startMethod = "index-based" 且  endMethod = "symbol-based" */
interface ReNameDeleteRuleByDirection_StartIndexBasedAndEndSymbolBased
  extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'ltr' | 'rtl'
  /** 开始方式  */
  startMethod: 'index-based'
  /** 结束方式  */
  endMethod: 'symbol-based'
  /** 起始索引  */
  startIndex: number
  /** 结束文本  */
  endText: string
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于方向 ==> startMethod = "symbol-based" 且  endMethod = "count-based" */
interface ReNameDeleteRuleByDirection_StartSymbolBasedAndEndIndexBased
  extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'ltr' | 'rtl'
  /** 开始方式  */
  startMethod: 'symbol-based'
  /** 结束方式  */
  endMethod: 'count-based'
  /** 起始文本  */
  startText: string
  /** 删除数量 */
  removeCount: number
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于方向 ==> startMethod = "symbol-based" 且  endMethod = "symbol-based" */
interface ReNameDeleteRuleByDirection_StartSymbolBasedAndEndSymbolBased
  extends ReNameDeleteRuleBase {
  /** 要删除的内容 */
  match: string
  /** 要删除的范围 */
  range: 'ltr' | 'rtl'
  /** 开始方式  */
  startMethod: 'symbol-based'
  /** 结束方式  */
  endMethod: 'symbol-based'
  /** 起始文本 */
  startText: string
  /** 结束文本 */
  endText: string
  /** 忽略大小写 */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 删除规则：基于方向  */
type ReNameDeleteRuleByDirection =
  | ReNameDeleteRuleByDirection_StartIndexBasedAndEndCountBased
  | ReNameDeleteRuleByDirection_StartIndexBasedAndEndSymbolBased
  | ReNameDeleteRuleByDirection_StartSymbolBasedAndEndIndexBased
  | ReNameDeleteRuleByDirection_StartSymbolBasedAndEndSymbolBased

/** 删除规则类型  */
export type TReNameDeleteRule =
  | ReNameDeleteRuleByOverall
  | ReNameDeleteRuleByAnchor
  | ReNameDeleteRuleByDirection
