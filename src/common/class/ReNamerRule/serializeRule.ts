import type { ReNameSerializeRuleAll } from '../../interface/ReNamerRule/serializeRule'

/** 序列化规则 */
export class ReNameSerializeRule implements ReNameSerializeRuleAll {
  type: 'serialize' = 'serialize'
  position: 'prefix' | 'suffix' | 'index' | 'after_the_text' | 'before_the_text' | 'replace'
  anchorIndex: number
  anchorText: string
  sequenceStart: number
  sequenceStep: number
  paddingCount: number
  resetFolderChanges: boolean
  ignoreCase: boolean
  isExactMatch: boolean
  ignoreExt: boolean

  constructor(
    options: Omit<ReNameSerializeRuleAll, 'type'> = {
      position: 'prefix',
      anchorIndex: 0,
      anchorText: '',
      sequenceStart: 0,
      sequenceStep: 1,
      paddingCount: 3,
      resetFolderChanges: true,
      ignoreCase: true,
      isExactMatch: true,
      ignoreExt: true
    }
  ) {
    const {
      position,
      anchorIndex,
      anchorText,
      sequenceStart,
      sequenceStep,
      paddingCount,
      resetFolderChanges,
      ignoreCase,
      isExactMatch,
      ignoreExt
    } = options

    this.position = position
    this.anchorIndex = anchorIndex
    this.anchorText = anchorText
    this.sequenceStart = sequenceStart
    this.sequenceStep = sequenceStep
    this.paddingCount = paddingCount
    this.resetFolderChanges = resetFolderChanges
    this.ignoreCase = ignoreCase
    this.isExactMatch = isExactMatch
    this.ignoreExt = ignoreExt
  }
}
