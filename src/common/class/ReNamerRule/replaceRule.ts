import type { TReNameReplaceRule as IReNameReplaceRule } from '../../interface/ReNamerRule/replaceRule'

/** 替换规则 */
export class ReNameReplaceRule implements IReNameReplaceRule {
  type: 'replace' = 'replace'
  match: string
  range: 'all' | 'first' | 'last'
  replaceTo: string
  ignoreCase: boolean
  isExactMatch: boolean
  ignoreExt: boolean
  constructor(
    options: Omit<IReNameReplaceRule, 'type'> = {
      match: '',
      range: 'all',
      replaceTo: '',
      ignoreCase: false,
      isExactMatch: false,
      ignoreExt: true
    }
  ) {
    const { match, range, replaceTo, ignoreCase, isExactMatch, ignoreExt } = options
    this.match = match
    this.range = range
    this.replaceTo = replaceTo
    this.ignoreCase = ignoreCase
    this.isExactMatch = isExactMatch
    this.ignoreExt = ignoreExt
  }
}
