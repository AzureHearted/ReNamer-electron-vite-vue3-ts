import type { TReNameExtensionRule } from '../../interface/ReNamerRule/extensionRule'

/** 正则规则 */
export class ReNameExtensionRule implements TReNameExtensionRule {
  type: 'extension' = 'extension'
  newExt: string
  appendToOriginalExtension: boolean
  constructor(
    options: Omit<TReNameExtensionRule, 'type'> = {
      newExt: '',
      appendToOriginalExtension: false
    }
  ) {
    const { newExt, appendToOriginalExtension } = options
    this.newExt = newExt
    this.appendToOriginalExtension = appendToOriginalExtension
  }
}
