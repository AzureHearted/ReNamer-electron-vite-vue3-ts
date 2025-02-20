import type { TReNameRegexRule as TReNameRegexRule } from '../../interface/ReNameRule/regexRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 正则规则 */
export class ReNameRegexRule extends ReNameRuleBase implements TReNameRegexRule {
  type: 'regex' = 'regex'
  regex: string
  replaceTo: string
  ignoreCase: boolean
  isExactMatch: boolean
  constructor(options: Partial<Omit<TReNameRegexRule, 'type'>> = {}) {
    super(options)
    const { regex, replaceTo, ignoreCase, isExactMatch } = options
    this.regex = regex ?? ''
    this.replaceTo = replaceTo ?? ''
    this.ignoreCase = ignoreCase ?? true
    this.isExactMatch = isExactMatch ?? false
  }
  // 规则名称
  public get name() {
    return getRuleName(this)
  }
  public set name(_value: string) {}
  // 规则描述
  public get description() {
    return generateRuleDesc(this)
  }
  public set description(_value: string) {}
}
