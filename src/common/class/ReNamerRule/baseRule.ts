import type { ReNameRuleBase as IReNameRuleBase } from '../../interface/ReNamerRule/base'

//s 基础类
export class ReNameRuleBase implements IReNameRuleBase {
  type: 'remove' | 'fill' | 'replace' | 'insert' | 'serialize' | 'regex' | 'extension'
  ignoreExt: boolean
  constructor(options: IReNameRuleBase = { type: 'insert', ignoreExt: true }) {
    const { type, ignoreExt } = options
    this.type = type
    this.ignoreExt = ignoreExt
  }
}
