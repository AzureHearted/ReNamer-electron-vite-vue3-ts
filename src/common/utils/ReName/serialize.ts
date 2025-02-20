import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameSerializeRule } from '@common/class/ReNameRule'
import { insertStringByIndex, insertStringByMatch } from './common'

//f 序列类重命名
export function serialize(list: ReNamePath[], rule: ReNameSerializeRule) {
  const {
    position,
    sequenceStart,
    sequenceStep,
    ignoreExt,
    resetFolderChanges,
    anchorIndex,
    anchorText
  } = rule
  // 最大补零长度
  const autoPaddingLength =
    Math.floor(Math.log10(Math.abs(list.length * sequenceStep))) + (sequenceStep > 0 ? 1 : 2)
  // 当前目录
  let currentFolder: string | null = null
  // 序列计数
  let num = 0
  // 依次处理每个文件
  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    //* 跳过不被允许修改的项目
    if (!item.enable) continue

    // 如果当前目录为null，或者当前目录与item所在目录不同则记录当前目录
    if (!currentFolder || currentFolder !== item.parent) {
      currentFolder = item.parent
      // 此时判断是否重置序列
      if (resetFolderChanges) num = 0
    }
    // 生成序列
    let sequence = `${Math.abs(num++ * sequenceStep + sequenceStart)}`
    // 判断是否补零填充
    let paddingCount = 0
    if (rule.paddingCount > 0) {
      paddingCount = rule.paddingCount
      sequence = sequence.padStart(paddingCount, '0')
    } else if ((rule.paddingCount = -1)) {
      sequence = sequence.padStart(
        Number(sequence) !== 0 ? autoPaddingLength : autoPaddingLength + 1,
        '0'
      )
    }
    // 判断是递增还是递减
    if (sequenceStep < 0 && Number(sequence) !== 0) {
      sequence = '-' + sequence
    }

    //* 判断是否忽略扩展名
    const { newName, newNameNoExt, ext } = item.temp
    const tempName = ignoreExt ? newNameNoExt : newName
    const tempExt = ignoreExt ? ext : ''

    // 判断插入位置
    switch (position) {
      case 'prefix':
        item.temp.newName = sequence + tempName + tempExt
        break
      case 'suffix':
        item.temp.newName = tempName + sequence + tempExt
        break
      case 'index':
        item.temp.newName = insertStringByIndex(tempName, sequence, anchorIndex) + tempExt
        break
      case 'before':
        item.temp.newName = insertStringByMatch(tempName, sequence, anchorText, 'before') + tempExt
        break
      case 'after':
        item.temp.newName = insertStringByMatch(tempName, sequence, anchorText, 'after') + tempExt
        break
      case 'replace':
        item.temp.newName = sequence + tempExt
        break
    }

    // console.table({ tempName, tempExt, result: item.temp.newName, sequence })
  }
}
