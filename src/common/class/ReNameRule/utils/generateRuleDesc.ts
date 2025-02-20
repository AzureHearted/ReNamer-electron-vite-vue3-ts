import {
  TReNameRule,
  ReNameInsertRule,
  ReNameReplaceRule,
  ReNameRemoveRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
} from '@common/class/ReNameRule'

/**
 * * 根据规则生成对应的描述文本
 * @param rule 规则对象
 * @returns 描述文本
 */
export function generateRuleDesc(rule: TReNameRule): string {
  if (!rule.type) return ''
  switch (rule.type) {
    case 'insert':
      return generateInsertRuleDesc(rule)
    case 'replace':
      return generateReplaceRuleDesc(rule)
    case 'remove':
      return generateRemoveRuleDesc(rule)
    case 'serialize':
      return generateSerializeRuleDesc(rule)
    case 'fill':
      return generateFillRuleDesc(rule)
    case 'regex':
      return generateRegexRuleDesc(rule)
    case 'extension':
      return generateExtensionRuleDesc(rule)
  }
}

//f 生成"插入"规则的描述文本
function generateInsertRuleDesc(rule: ReNameInsertRule): string {
  let des = `插入 "${rule.text}"`
  // 分情况讨论
  if (rule.position === 'prefix' || rule.position === 'suffix') {
    const direction = rule.position === 'prefix' ? '前' : '后'
    des += ` 作为${direction}缀`
  }
  if (rule.position === 'index') {
    des += ` 在位置 ${rule.anchorIndex} 处`
  }
  if (rule.position === 'after' || rule.position === 'before') {
    des += ` 在 "${rule.anchorText}"`
    // 判断：是否忽略大小写、全字匹配
    des += rule.ignoreCase ? '（不区分大小写）' : ''
    des += rule.isExactMatch ? '（全字匹配）' : ''
    // 判断：方向
    const direction = rule.position === 'before' ? '前' : '后'
    des += ` 之${direction}`
  }
  if (rule.position === 'replace') {
    des += ` 替换当前文件名`
  }
  // 最后判断是否忽略扩展名
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  return des
}

//f 生成"替换"规则的描述文本
function generateReplaceRuleDesc(rule: ReNameReplaceRule): string {
  const rangeMap = {
    all: '全部',
    first: '首个',
    last: '末个'
  }
  let des = `替换${rangeMap[rule.range]} "${rule.match}" 替换为 "${rule.replaceTo}"` // 默认描述为空
  // 最后判断：是否忽略扩展名、区分大小写、全字匹配
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  if (rule.ignoreCase) {
    des += '（不区分大小写）'
  }
  if (rule.isExactMatch) {
    des += '（全字匹配）'
  }
  return des
}

//f 生成"移除"规则的描述文本
function generateRemoveRuleDesc(rule: ReNameRemoveRule): string {
  const rangeMap = {
    all: '全部',
    first: '首个',
    last: '末个'
  }
  let des = `移除${rangeMap[rule.range]} "${rule.match}"`
  // 最后判断：是否忽略扩展名、区分大小写、全字匹配
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  if (rule.ignoreCase) {
    des += '（不区分大小写）'
  }
  if (rule.isExactMatch) {
    des += '（全字匹配）'
  }
  return des
}

//f 生成"序列化"规则的描述文本
function generateSerializeRuleDesc(rule: ReNameSerializeRule): string {
  let des = `增量序列化起始于 ${rule.sequenceStart} 增量 ${rule.sequenceStep}`
  if (rule.resetFolderChanges) {
    des += `（文件夹变更时重置）`
  }
  if (rule.paddingCount > 0) {
    des += ` 补足长度为 ${rule.paddingCount} 位`
  } else if (rule.paddingCount === -1) {
    des += ` 补足长度自动识别`
  }
  // 位置
  if (rule.position === 'prefix' || rule.position === 'suffix') {
    const direction = rule.position === 'prefix' ? '前' : '后'
    des += ` 作为${direction}缀`
  }
  if (rule.position === 'index') {
    des += ` 序列插入到 ${rule.anchorIndex} 处`
  }
  if (rule.position === 'after' || rule.position === 'before') {
    des += ` 序列插入到 "${rule.anchorText}"`
    // 判断：是否忽略大小写、全字匹配
    des += rule.ignoreCase ? '（不区分大小写）' : ''
    des += rule.isExactMatch ? '（全字匹配）' : ''
    // 判断方向
    const direction = rule.position === 'before' ? '前' : '后'
    des += ` 之${direction}`
  }
  if (rule.position === 'replace') {
    des += ` 替换当前文件名`
  }
  // 判断是否忽略扩展名
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  return des
}

//f 生成"填充"规则的描述文本
function generateFillRuleDesc(rule: ReNameFillRule): string {
  let des = ''
  // 分情况讨论
  if (rule.removeZeroPadding) {
    des += '移除补零'
  } else if (rule.zeroPadding.enable) {
    des += `补零填充，长度 ${rule.zeroPadding.length}`
  }
  if (rule.textPadding.enable) {
    const directionMap = {
      left: '左侧',
      right: '右侧'
    }
    if (rule.zeroPadding.enable || rule.removeZeroPadding) des += '；'
    des += `文本填充，填充内容 "${rule.textPadding.character}"，长度 ${rule.textPadding.length}，${directionMap[rule.textPadding.direction]}`
  }
  // 判断是否忽略扩展名
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  return des
}

//f 生成"正则"规则的描述文本
function generateRegexRuleDesc(rule: ReNameRegexRule): string {
  let des = `替换表达式 "${rule.regex}" 替换为 "${rule.replaceTo}"`
  // 最后判断：是否忽略扩展名、区分大小写、全字匹配
  if (rule.ignoreExt) {
    des += '（忽略扩展名）'
  }
  if (rule.ignoreCase) {
    des += '（不区分大小写）'
  }
  if (rule.isExactMatch) {
    des += '（全字匹配）'
  }
  return des
}

//f 生成"扩展名"规则的描述文本
function generateExtensionRuleDesc(rule: ReNameExtensionRule): string {
  if (rule.newExt == '') return '移除扩展名'
  let des = `修改扩展名为 "${rule.newExt}"`
  if (rule.ignoreExt) {
    des += ` (添加到原始文件名)`
  }
  return des
}
