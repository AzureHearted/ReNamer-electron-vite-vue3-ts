import type {
  ReNameInsertRuleAll as IReNameInsertRuleAll,
  ReNameInsertRuleByDirection as IReNameInsertRuleByDirection,
  ReNameInsertRuleByAnchorDirection as IReNameInsertRuleByAnchorDirection,
  ReNameInsertRuleByIndex as IReNameInsertRuleByIndex,
  TReNameInsertRule
} from '../../interface/ReNamerRule/insertRule'
import { ReNameRuleBase } from './baseRule'

/** 插入规则 */
export class ReNameInsertRule implements IReNameInsertRuleAll {
  type: 'insert' = 'insert'
  text: string
  position: 'prefix' | 'suffix' | 'index' | 'after' | 'before' | 'replace'
  anchorIndex: number
  anchorText: string
  ignoreCase: boolean
  ignoreExt: boolean
  isExactMatch: boolean

  constructor(
    options: Omit<IReNameInsertRuleAll, 'type'> = {
      position: 'prefix',
      text: '',
      anchorIndex: 1,
      anchorText: '',
      ignoreCase: false,
      ignoreExt: true,
      isExactMatch: false
    }
  ) {
    const { position, text, anchorIndex, anchorText, ignoreCase, ignoreExt, isExactMatch } = options
    this.position = position
    this.text = text
    this.anchorIndex = anchorIndex
    this.anchorText = anchorText
    this.ignoreCase = ignoreCase
    this.ignoreExt = ignoreExt
    this.isExactMatch = isExactMatch
  }
}
