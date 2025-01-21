import type { ReNameFillRuleAll } from '../../interface/ReNamerRule/fillRule'

/** 填充规则 */
export class ReNameFillRule implements ReNameFillRuleAll {
  type: 'fill' = 'fill'
  method: 'zeroPadding' | 'textPadding' | 'removeZeroPadding'
  length: number
  character: string
  direction: 'left' | 'right'
  ignoreExt: boolean
  constructor(
    options: Omit<ReNameFillRuleAll, 'type'> = {
      method: 'zeroPadding',
      length: 3,
      character: '',
      direction: 'left',
      ignoreExt: true
    }
  ) {
    const { method, length, character, direction, ignoreExt } = options
    this.method = method
    this.length = length
    this.character = character
    this.direction = direction
    this.ignoreExt = ignoreExt
  }
}
