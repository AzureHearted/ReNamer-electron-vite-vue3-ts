import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameReplaceRule } from '@common/class/ReNameRule'
import { insertStringByIndex, insertStringByMatch, replaceString } from './common'

//f 序列类重命名
export function replace(list: ReNamePath[], rule: ReNameReplaceRule) {
  const { range, match, replaceTo, ignoreCase, isExactMatch, ignoreExt } = rule

  // 依次处理每个文件
  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    //* 跳过不被允许修改的项目
    if (!item.enable) continue

    //* 判断是否忽略扩展名
    const { newName, newNameNoExt, ext } = item.temp
    const tempName = ignoreExt ? newNameNoExt : newName
    const tempExt = ignoreExt ? ext : ''

    item.temp.newName =
      replaceString(tempName, match, replaceTo, {
        ignoreCase,
        isExactMatch,
        range
      }) + tempExt
  }
}
