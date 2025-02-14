import { ReNameInsertRule } from './insertRule'
import { ReNameReplaceRule } from './replaceRule'
import { ReNameRemoveRule } from './removeRule'
import { ReNameSerializeRule } from './serializeRule'
import { ReNameFillRule } from './fillRule'
import { ReNameRegexRule } from './regexRule'
import { ReNameExtensionRule } from './extensionRule'

export {
  ReNameInsertRule,
  ReNameReplaceRule,
  ReNameRemoveRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
}

/** 重命名规则 */
export type TReNameRule =
  | ReNameInsertRule
  | ReNameReplaceRule
  | ReNameRemoveRule
  | ReNameSerializeRule
  | ReNameFillRule
  | ReNameRegexRule
  | ReNameExtensionRule
