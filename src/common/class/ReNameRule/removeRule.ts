import type { ReNameRemoveRuleAll, TReNameRemoveRule } from '../../interface/ReNameRule/removeRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/**
 * 删除规则
 */
export class ReNameRemoveRule extends ReNameRuleBase implements ReNameRemoveRuleAll {
  type: 'remove' = 'remove'
  match: string
  range: 'all' | 'first' | 'last'
  ignoreCase: boolean
  isExactMatch: boolean
  constructor(options: Partial<Omit<ReNameRemoveRuleAll, 'type'>> = {}) {
    super(options)
    const { match, range, ignoreCase, isExactMatch } = options
    this.match = match ?? ''
    this.range = range ?? 'all'
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
