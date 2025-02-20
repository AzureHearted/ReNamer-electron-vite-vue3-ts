import { buildUUID } from '@common/utils/common'
import type { ReNameRuleBase as IReNameRuleBase } from '../../interface/ReNameRule/base'

class RuleInfo {
  private _name: string = ''
  /** 规则名称 */
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }
  private _description: string = ''
  /** 规则描述 */
  public get description(): string {
    return this._description
  }
  public set description(value: string) {
    this._description = value
  }
}

//s 基础类
export class ReNameRuleBase extends RuleInfo implements IReNameRuleBase {
  id: string
  enable: boolean
  ignoreExt: boolean

  constructor(options: Partial<Omit<IReNameRuleBase, 'description'>> = {}) {
    super()
    const { id, enable, ignoreExt } = options
    this.id = id ?? buildUUID()
    this.enable = enable ?? true
    this.ignoreExt = ignoreExt ?? true
  }
}
