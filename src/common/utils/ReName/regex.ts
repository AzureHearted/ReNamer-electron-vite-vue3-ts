import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameRegexRule } from '@common/class/ReNameRule'
import { regexReplace } from './common'

//f 填充类重命名
export function regex(list: ReNamePath[], rule: ReNameRegexRule) {
  const { regex, replaceTo, ignoreExt, ignoreCase, isExactMatch } = rule
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
      regexReplace(tempName, regex, replaceTo, { ignoreCase, isExactMatch }) + tempExt
  }
}
