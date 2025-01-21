import type { ReNameRuleBase } from './base'

/** "扩展名"规则 (tips: 该规则只对文件有效,对文件夹无效 ) */
export interface ReNameExtensionRuleAll extends Omit<ReNameRuleBase, 'ignoreExt'> {
  type: 'extension'
  /** 新扩展名 (无需添加.符号) */
  newExt: string
  /** 添加到原始扩展名之后 (如果不启用则默认直接替换原本的扩展名) */
  appendToOriginalExtension: boolean
}

export type TReNameExtensionRule = ReNameExtensionRuleAll
