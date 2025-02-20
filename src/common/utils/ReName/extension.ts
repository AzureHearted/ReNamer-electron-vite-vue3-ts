import { ReNamePath } from '@common/class/ReNamePath'
import { ReNameExtensionRule } from '@common/class/ReNameRule'

//f 填充类重命名
export function extension(list: ReNamePath[], rule: ReNameExtensionRule) {
  const { newExt, ignoreExt } = rule
  // 依次处理每个文件
  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    //* 跳过不被允许修改的项目(文件夹也不支持此规则)
    if (!item.enable || item.isDirectory) continue
    //* 判断是否忽略扩展名
    const { newName, newNameNoExt } = item.temp
    // 这里 ignoreExt 逻辑要相反 (因为对于extension来说,忽略扩展名相当于将新扩展名添加到末尾)
    const tempName = ignoreExt ? newName : newNameNoExt
    item.temp.newName = tempName + (newExt ? `.${newExt}` : '')
  }
}
