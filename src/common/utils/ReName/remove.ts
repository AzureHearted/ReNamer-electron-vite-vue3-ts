import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameRemoveRule } from '@common/class/ReNameRule'
import { removeString } from './common'

//f 序列类重命名
export function remove(list: ReNamePath[], rule: ReNameRemoveRule) {
  const { range, match, ignoreCase, isExactMatch, ignoreExt } = rule

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
      removeString(tempName, match, {
        ignoreCase,
        isExactMatch,
        range
      }) + tempExt
  }
}
