import { ReNamePath } from '@common/class/ReNamePath'
import { TReNameRule } from '@common/class/ReNameRule'

import { insert } from './insert'
import { serialize } from './serialize'
import { replace } from './replace'
import { remove } from './remove'
import { fill } from './fill'
import { regex } from './regex'
import { extension } from './extension'

export function ReName(list: ReNamePath[], ruleList: TReNameRule[]) {
  // 先还原
  list.forEach((x) => x.resetModify())
  for (const rule of ruleList) {
    const { type } = rule
    console.log('当前规则', rule)
    // 跳过没有启用的规则
    if (!rule.enable) continue
    // 判断规则类型
    switch (type) {
      case 'insert':
        insert(list, rule)
        break
      case 'replace':
        replace(list, rule)
        break
      case 'remove':
        remove(list, rule)
        break
      case 'serialize':
        serialize(list, rule)
        break
      case 'fill':
        fill(list, rule)
        break
      case 'regex':
        regex(list, rule)
        break
      case 'extension':
        extension(list, rule)
        break
    }
  }
  // 保存修改结果
  list.forEach((x) => x.saveModify())
}
