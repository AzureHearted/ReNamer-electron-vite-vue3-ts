import {
  TReNameRule,
  ReNameInsertRule,
  ReNameRemoveRule,
  ReNameReplaceRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
} from '@common/class/ReNameRule'

// 类型映射
type RuleTypeMap = {
  insert: ReNameInsertRule
  replace: ReNameReplaceRule
  remove: ReNameRemoveRule
  serialize: ReNameSerializeRule
  fill: ReNameFillRule
  regex: ReNameRegexRule
  extension: ReNameExtensionRule
}

/**
 * * 根据规则生成对应的描述文本
 * @param  ruleObj 规则对象
 * @returns 描述文本
 */
export function generateRuleByObj<T extends keyof RuleTypeMap>(
  ruleObj?: Partial<TReNameRule> & { type: T }
): RuleTypeMap[T] | null {
  if (!ruleObj) return null
  switch (ruleObj.type) {
    case 'insert':
      return new ReNameInsertRule(ruleObj) as RuleTypeMap[T]
    case 'replace':
      return new ReNameReplaceRule(ruleObj) as RuleTypeMap[T]
    case 'remove':
      return new ReNameRemoveRule(ruleObj) as RuleTypeMap[T]
    case 'serialize':
      return new ReNameSerializeRule(ruleObj) as RuleTypeMap[T]
    case 'fill':
      return new ReNameFillRule(ruleObj) as RuleTypeMap[T]
    case 'regex':
      return new ReNameRegexRule(ruleObj) as RuleTypeMap[T]
    case 'extension':
      return new ReNameExtensionRule(ruleObj) as RuleTypeMap[T]
    default:
      return null
  }
}
