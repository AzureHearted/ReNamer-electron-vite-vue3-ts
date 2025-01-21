import type { ReNameRuleBase } from './base'

/** "填充"规则 */
export interface ReNameFillRuleAll extends ReNameRuleBase {
  type: 'fill'
  /** 填充方式 */
  method: 'zeroPadding' | 'textPadding' | 'removeZeroPadding'
  /** 填充长度 (仅在 method !== "removeZeroPadding" 时生效) */
  length: number
  /** 填充字符 (仅在 method = "textPadding" 时生效) */
  character: string
  /** 填充方向 (仅在 method = "textPadding" 时生效) */
  direction: 'left' | 'right'
}

/** 填充规则：基本规则 */
interface ReNameFillRuleBase extends ReNameRuleBase {
  type: 'fill'
}

/** 填充规则：补零 */
interface ReNameFillRuleZeroPadding extends ReNameFillRuleBase {
  /** 填充方式 */
  method: 'zeroPadding'
  /** 填充长度 */
  length: number
}

/** 填充规则：填充字符 */
interface ReNameFillRuleTextPadding extends ReNameFillRuleBase {
  /** 填充方式 */
  method: 'textPadding'
  /** 填充字符 */
  character: string
  /** 填充长度 */
  length: number
  /** 填充方向 */
  direction: 'left' | 'right'
}

/** 填充规则：移除补零 */
interface ReNameFillRuleRemoveZeroPadding extends ReNameFillRuleBase {
  /** 填充方式 */
  method: 'removeZeroPadding'
}

/** 填充规则 */
export type TReNameFillRule =
  | ReNameFillRuleZeroPadding
  | ReNameFillRuleTextPadding
  | ReNameFillRuleRemoveZeroPadding
