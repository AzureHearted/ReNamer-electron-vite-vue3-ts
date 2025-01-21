import type { TReNameRegexRule as TReNameRegexRule } from '../../interface/ReNamerRule/regexRule'

/** 正则规则 */
export class ReNameRegexRule implements TReNameRegexRule {
  type: 'regex' = 'regex'
  regex: string
  replaceTo: string
  ignoreCase: boolean
  isExactMatch: boolean
  ignoreExt: boolean
  constructor(
    options: Omit<TReNameRegexRule, 'type'> = {
      regex: '',
      replaceTo: '',
      ignoreCase: false,
      isExactMatch: false,
      ignoreExt: true
    }
  ) {
    const { regex, replaceTo, ignoreCase, isExactMatch, ignoreExt } = options
    this.regex = regex
    this.replaceTo = replaceTo
    this.ignoreCase = ignoreCase
    this.isExactMatch = isExactMatch
    this.ignoreExt = ignoreExt
  }
}
