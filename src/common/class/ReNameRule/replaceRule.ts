import type { TReNameReplaceRule as IReNameReplaceRule } from '../../interface/ReNameRule/replaceRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 替换规则 */
export class ReNameReplaceRule extends ReNameRuleBase implements IReNameReplaceRule {
  type: 'replace' = 'replace'
  match: string
  range: 'all' | 'first' | 'last'
  replaceTo: string
  ignoreCase: boolean
  isExactMatch: boolean
  constructor(options: Partial<Omit<IReNameReplaceRule, 'type'>> = {}) {
    super(options)
    const { match, range, replaceTo, ignoreCase, isExactMatch } = options
    this.match = match ?? ''
    this.range = range ?? 'all'
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
