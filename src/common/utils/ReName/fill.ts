import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameFillRule } from '@common/class/ReNameRule'
import { paddingString, removeZeroPaddingString, zeroPaddingString } from './common'

//f 填充类重命名
export function fill(list: ReNamePath[], rule: ReNameFillRule) {
  const { zeroPadding, textPadding, removeZeroPadding, ignoreExt } = rule
  // 依次处理每个文件
  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    //* 跳过不被允许修改的项目
    if (!item.enable) continue

    {
      //* 判断是否忽略扩展名
      let { newName, newNameNoExt, ext } = item.temp
      let tempName = ignoreExt ? newNameNoExt : newName
      let tempExt = ignoreExt ? ext : ''
      //s 进行补零填充
      if (removeZeroPadding) {
        // 移除补零
        item.temp.newName = removeZeroPaddingString(tempName) + tempExt
      } else if (zeroPadding.enable) {
        // 补零填充
        const { length } = zeroPadding
        item.temp.newName = zeroPaddingString(tempName, length) + tempExt
      }
    }

    //s 进行文本填充
    if (textPadding.enable) {
      //* 判断是否忽略扩展名
      let { newName, newNameNoExt, ext } = item.temp
      let tempName = ignoreExt ? newNameNoExt : newName
      let tempExt = ignoreExt ? ext : ''
      const { character, length, direction } = textPadding
      item.temp.newName = paddingString(tempName, character, length, direction) + tempExt
    }
  }
}
