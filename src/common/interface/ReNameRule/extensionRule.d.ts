import type { ReNameRuleBase } from './base'

/** "扩展名"规则 (tips: 该规则只对文件有效,对文件夹无效 ) */
export interface ReNameExtensionRuleAll extends ReNameRuleBase {
  type: 'extension'
  /** 新扩展名 (无需添加.符号) */
  newExt: string
}

export type TReNameExtensionRule = ReNameExtensionRuleAll
