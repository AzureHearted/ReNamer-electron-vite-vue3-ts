import { ReNameInsertRule } from './insertRule'
import { ReNameReplaceRule } from './replaceRule'
import { ReNameRemoveRule } from './removeRule'
import { ReNameSerializeRule } from './serializeRule'
import { ReNameFillRule } from './fillRule'
import { ReNameRegexRule } from './regexRule'
import { ReNameExtensionRule } from './extensionRule'

import { ReNameInsertRuleAll } from '@common/interface/ReNameRule/insertRule'
import { ReNameReplaceRuleAll } from '@common/interface/ReNameRule/replaceRule'
import { ReNameRemoveRuleAll } from '@common/interface/ReNameRule/removeRule'
import { ReNameSerializeRuleAll } from '@common/interface/ReNameRule/serializeRule'
import { ReNameFillRuleAll } from '@common/interface/ReNameRule/fillRule'
import { ReNameRegexRuleAll } from '@common/interface/ReNameRule/regexRule'
import { ReNameExtensionRuleAll } from '@common/interface/ReNameRule/extensionRule'

export {
  ReNameInsertRule,
  ReNameReplaceRule,
  ReNameRemoveRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
}

export type {
  ReNameInsertRuleAll,
  ReNameReplaceRuleAll,
  ReNameRemoveRuleAll,
  ReNameSerializeRuleAll,
  ReNameFillRuleAll,
  ReNameRegexRuleAll,
  ReNameExtensionRuleAll
}

/** 重命名规则类型 */
export type TReNameRule =
  | ReNameInsertRule
  | ReNameReplaceRule
  | ReNameRemoveRule
  | ReNameSerializeRule
  | ReNameFillRule
  | ReNameRegexRule
  | ReNameExtensionRule


