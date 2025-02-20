import type {
  ReNameInsertRuleAll as IReNameInsertRuleAll,
  ReNameInsertRuleByDirection as IReNameInsertRuleByDirection,
  ReNameInsertRuleByAnchorDirection as IReNameInsertRuleByAnchorDirection,
  ReNameInsertRuleByIndex as IReNameInsertRuleByIndex,
  TReNameInsertRule
} from '../../interface/ReNameRule/insertRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 插入规则 */
export class ReNameInsertRule extends ReNameRuleBase implements IReNameInsertRuleAll {
  type: 'insert' = 'insert'
  text: string
  position: 'prefix' | 'suffix' | 'index' | 'after' | 'before' | 'replace'
  anchorIndex: number
  anchorText: string
  ignoreCase: boolean
  isExactMatch: boolean
  constructor(options: Partial<Omit<IReNameInsertRuleAll, 'type'>> = {}) {
    super(options)
    const { position, text, anchorIndex, anchorText, ignoreCase, isExactMatch } = options
    this.position = position ?? 'prefix'
    this.text = text ?? ''
    this.anchorIndex = anchorIndex ?? 1
    this.anchorText = anchorText ?? ''
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
