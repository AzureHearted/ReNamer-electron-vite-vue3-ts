import type { ReNameRuleBase } from './base'

/** "填充"规则 */
export interface ReNameFillRuleAll extends ReNameRuleBase {
  type: 'fill'
  /** 补零填充 */
  zeroPadding: ZeroPadding
  /** 移除补零 */
  removeZeroPadding: boolean
  /** 文本填充 */
  textPadding: TextPadding
}

/** 补零填充 */
export interface ZeroPadding {
  /** 是否启用 */
  enable: boolean
  /** 填充长度*/
  length: number
}

/** 文本填充 */
export interface TextPadding {
  /** 是否启用 */
  enable: boolean
  /** 填充字符 */
  character: string
  /** 填充长度*/
  length: number
  /** 填充方向  */
  direction: 'left' | 'right'
}

/** 填充规则 */
export type TReNameFillRule = ReNameFillRuleAll
