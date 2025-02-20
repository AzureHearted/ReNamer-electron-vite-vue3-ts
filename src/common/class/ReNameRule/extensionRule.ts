import type { TReNameExtensionRule } from '../../interface/ReNameRule/extensionRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 正则规则 */
export class ReNameExtensionRule extends ReNameRuleBase implements TReNameExtensionRule {
  type: 'extension' = 'extension'
  newExt: string
  constructor(options: Partial<Omit<TReNameExtensionRule, 'type'>> = {}) {
    super(options)
    const { newExt, ignoreExt } = options
    this.newExt = newExt ?? ''
    this.ignoreExt = ignoreExt ?? false
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
