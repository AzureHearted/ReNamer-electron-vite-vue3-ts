import type {
  ReNameFillRuleAll,
  ZeroPadding as IZeroPadding,
  TextPadding as ITextPadding
} from '../../interface/ReNameRule/fillRule'
import { ReNameRuleBase } from './baseRule'
import { generateRuleDesc } from './utils/generateRuleDesc'
import { getRuleName } from './utils/getRuleName'

/** 填充规则 */
export class ReNameFillRule extends ReNameRuleBase implements ReNameFillRuleAll {
  type: 'fill' = 'fill'
  zeroPadding: IZeroPadding
  removeZeroPadding: boolean
  textPadding: ITextPadding

  constructor(options: Partial<Omit<ReNameFillRuleAll, 'type'>> = {}) {
    super(options)
    const { removeZeroPadding, zeroPadding, textPadding } = options
    this.zeroPadding = new ZeroPadding(zeroPadding)
    this.removeZeroPadding = removeZeroPadding ?? false
    this.textPadding = new TextPadding(textPadding)
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

/** 补零填充 */
class ZeroPadding implements IZeroPadding {
  enable: boolean
  length: number
  constructor(options: Partial<IZeroPadding> = {}) {
    const { enable, length } = options
    this.enable = enable ?? false
    this.length = length ?? 1
  }
}
/** 文本填充 */
class TextPadding implements ITextPadding {
  enable: boolean = false
  character: string = ''
  length: number = 1
  direction: 'left' | 'right' = 'left'
  constructor(options: Partial<ITextPadding> = {}) {
    const { enable, character, length, direction } = options
    this.enable = enable ?? false
    this.character = character ?? ''
    this.direction = direction ?? 'left'
    this.length = length ?? 1
  }
}
