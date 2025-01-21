import type {
  ReNameDeleteRuleAll as IReNameDeleteRuleAll,
  TReNameDeleteRule
} from '../../interface/ReNamerRule/deleteRule'

/**
 * 删除规则
 */
export class ReNameDeleteRule implements IReNameDeleteRuleAll {
  type: 'delete' = 'delete'
  match: string
  range: 'all' | 'first' | 'last' | 'before' | 'after' | 'ltr' | 'rtl'
  startMethod: 'index-based' | 'symbol-based'
  endMethod: 'count-based' | 'symbol-based'
  anchorText: string
  startIndex: number
  startText: string
  removeCount: number
  endText: string
  ignoreCase: boolean
  isExactMatch: boolean
  ignoreExt: boolean

  constructor(
    options: Omit<IReNameDeleteRuleAll, 'type'> = {
      match: '',
      range: 'all',
      startMethod: 'index-based',
      endMethod: 'count-based',
      anchorText: '',
      startIndex: 0,
      startText: '',
      removeCount: 0,
      endText: '',
      ignoreCase: false,
      isExactMatch: false,
      ignoreExt: true
    }
  ) {
    const {
      match,
      range,
      startMethod,
      endMethod,
      anchorText,
      startIndex,
      startText,
      removeCount,
      endText,
      ignoreCase,
      isExactMatch,
      ignoreExt
    } = options

    this.match = match
    this.range = range
    this.startMethod = startMethod
    this.endMethod = endMethod
    this.anchorText = anchorText
    this.startIndex = startIndex
    this.startText = startText
    this.removeCount = removeCount
    this.endText = endText
    this.ignoreCase = ignoreCase
    this.isExactMatch = isExactMatch
    this.ignoreExt = ignoreExt
  }
}
