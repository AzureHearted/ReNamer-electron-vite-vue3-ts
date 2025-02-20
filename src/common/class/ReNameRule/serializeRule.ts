import type { ReNameSerializeRuleAll } from '../../interface/ReNameRule/serializeRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 序列化规则 */
export class ReNameSerializeRule extends ReNameRuleBase implements ReNameSerializeRuleAll {
  type: 'serialize' = 'serialize'
  position: 'prefix' | 'suffix' | 'index' | 'after' | 'before' | 'replace'
  anchorIndex: number
  anchorText: string
  sequenceStart: number
  sequenceStep: number
  paddingCount: number
  resetFolderChanges: boolean
  ignoreCase: boolean
  isExactMatch: boolean
  constructor(options: Partial<Omit<ReNameSerializeRuleAll, 'type'>> = {}) {
    super(options)
    const {
      position,
      anchorIndex,
      anchorText,
      sequenceStart,
      sequenceStep,
      paddingCount,
      resetFolderChanges,
      ignoreCase,
      isExactMatch
    } = options
    this.position = position ?? 'prefix'
    this.anchorIndex = anchorIndex ?? 0
    this.anchorText = anchorText ?? ''
    this.sequenceStart = sequenceStart ?? 1
    this.sequenceStep = sequenceStep ?? 1
    this.paddingCount = paddingCount ?? 3
    this.resetFolderChanges = resetFolderChanges ?? true
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
