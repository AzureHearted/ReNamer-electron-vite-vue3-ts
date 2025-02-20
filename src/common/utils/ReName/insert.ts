import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameInsertRule } from '@common/class/ReNameRule'
import { insertStringByIndex, insertStringByMatch } from './common'

//f 序列类重命名
export function insert(list: ReNamePath[], rule: ReNameInsertRule) {
  const { position, text, anchorIndex, anchorText, ignoreCase, isExactMatch, ignoreExt } = rule

  // 依次处理每个文件
  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    //* 跳过不被允许修改的项目
    if (!item.enable) continue

    //* 判断是否忽略扩展名
    const { newName, newNameNoExt, ext } = item.temp
    const tempName = ignoreExt ? newNameNoExt : newName
    const tempExt = ignoreExt ? ext : ''

    // 判断插入位置
    switch (position) {
      case 'prefix':
        item.temp.newName = text + tempName + tempExt
        break
      case 'suffix':
        item.temp.newName = tempName + text + tempExt
        break
      case 'index':
        item.temp.newName = insertStringByIndex(tempName, text, anchorIndex) + tempExt
        break
      case 'before':
        item.temp.newName =
          insertStringByMatch(tempName, text, anchorText, 'before', {
            ignoreCase,
            isExactMatch
          }) + tempExt
        break
      case 'after':
        item.temp.newName =
          insertStringByMatch(tempName, text, anchorText, 'after', {
            ignoreCase,
            isExactMatch
          }) + tempExt
        break
      case 'replace':
        item.temp.newName = text + tempExt
        break
    }
  }
}
