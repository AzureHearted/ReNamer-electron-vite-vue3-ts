import { TReNameRule } from '@common/class/ReNameRule'

const ruleNameMap: { [key in TReNameRule['type']]: string } = {
  insert: '插入',
  replace: '替换',
  remove: '移除',
  serialize: '序列化',
  fill: '填充',
  regex: '正则',
  extension: '扩展名'
}

/** 获取规则名称 */
export function getRuleName(rule: TReNameRule) {
  return ruleNameMap[rule.type]
}
