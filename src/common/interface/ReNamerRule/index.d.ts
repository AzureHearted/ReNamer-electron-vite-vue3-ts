import type { TReNameInsertRule, ReNameInsertRuleAll } from './insertRule'
import type { TReNameReplaceRule, ReNameReplaceRuleAll } from './replaceRule'
import type { TReNameDeleteRule, ReNameDeleteRuleAll } from './deleteRule'
import type { TReNameSerializeRule, ReNameSerializeRuleAll } from './serializeRule'
import type { TReNameFillRule, ReNameFillRuleAll } from './fillRule'
import type { TReNameRegexRule, ReNameRegexRuleAll } from './regexRule'
import type { TReNameExtensionRule, ReNameExtensionRuleAll } from './extensionRule'

/** 重命名规则 */
export type TReNameRule =
  | TReNameInsertRule
  | TReNameReplaceRule
  | TReNameDeleteRule
  | TReNameSerializeRule
  | TReNameFillRule
  | TReNameRegexRule
  | TReNameExtensionRule

export {
  TReNameInsertRule,
  TReNameReplaceRule,
  TReNameDeleteRule,
  TReNameSerializeRule,
  TReNameFillRule,
  TReNameRegexRule,
  TReNameExtensionRule
}
