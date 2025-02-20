import { ReNameReplaceRule } from '@common/class/ReNameRule'

/**
 *f 插入字符串(基于索引)
 * @param original 原字符串
 * @param insert 要插入的内容
 * @param index 要插入的位置
 */
export function insertStringByIndex(original: string, insert: string, index: number): string {
  return `${original.slice(0, index)}${insert}${original.slice(index)}`
}

interface InsertStringOptions {
  /** 是否忽略大小写 */
  ignoreCase?: boolean
  /** 是否全字匹配 */
  isExactMatch?: boolean
}

/**
 *f 插入字符串（基于匹配结果）
 * @param original - 原始字符串
 * @param insert - 要插入的内容
 * @param match - 匹配的字符串
 * @param position - 插入位置，'before' 表示插入到匹配字符串前面，'after' 表示插入到匹配字符串后面
 * @param options - 匹配选项，支持是否忽略大小写、全字匹配
 * @returns - 返回修改后的字符串
 */
export function insertStringByMatch(
  original: string,
  insert: string,
  match: string,
  position: 'before' | 'after',
  options: InsertStringOptions = {}
): string {
  const { ignoreCase = true, isExactMatch = false } = options

  // 处理 match 以防止特殊字符影响正则匹配
  let matchRegexStr = isExactMatch ? `\\b(${match})\\b` : `(${match})`

  //* 创建正则表达式，如果 ignoreCase 为 true，则使用 'i' 标志忽略大小写
  let flags = 'g'
  if (ignoreCase) flags += 'i' // 忽略大小写
  const matchRegex = new RegExp(matchRegexStr, flags)

  // 处理 `$` 符号，确保 `$` 在替换中不被误解析
  const safeInsert = insert.replace(/\$/g, '$$$$')

  return original.replace(matchRegex, (_, group) => {
    return position === 'before'
      ? `${safeInsert}${group ?? match}` // 防止 group 为空
      : `${group ?? match}${safeInsert}`
  })
}

interface ReplaceStringOptions {
  /** 是否忽略大小写 */
  ignoreCase?: boolean
  /** 是否全字匹配 */
  isExactMatch?: boolean
  /** 替换范围  "all" | "first" | "last" */
  range?: ReNameReplaceRule['range']
}

/**
 *f 替换字符串
 * @param original - 原始字符串
 * @param match - 待替换的字符串
 * @param replaceTo - 替换为
 * @param options - 匹配选项，支持是否忽略大小写、全字匹配
 * @returns - 返回修改后的字符串
 */
interface ReplaceStringOptions {
  /** 是否忽略大小写 */
  ignoreCase?: boolean
  /** 是否全字匹配 */
  isExactMatch?: boolean
  /** 替换范围 */
  range?: 'all' | 'first' | 'last'
}

export function replaceString(
  original: string,
  match: string,
  replaceTo: string,
  options?: ReplaceStringOptions
): string {
  // 解构选项参数，设置默认值
  const { ignoreCase = false, isExactMatch = false, range = 'all' } = options || {}

  // 根据是否忽略大小写决定正则表达式的标志
  // - 'g': 全局匹配
  // - 'i': 忽略大小写
  let flags: string = ''
  if (ignoreCase) flags += 'i'
  if (range !== 'first') flags += 'g'

  // 根据是否全字匹配决定正则表达式的模式
  // - 如果是全字匹配，使用 \b（单词边界）包裹匹配内容
  // - 否则直接使用匹配字符串
  const pattern = isExactMatch ? `\\b${match}\\b` : match

  // 创建正则表达式
  let regex = new RegExp(pattern, flags)

  // 根据替换范围决定替换逻辑
  switch (range) {
    case 'first':
      // 只替换第一个匹配项
      // 使用 String.prototype.replace 直接替换第一个匹配项
      return original.replace(regex, (_matched) => {
        // 替换第一个匹配项后，直接返回结果
        return replaceTo
      })

    case 'last':
      // 找到最后一个匹配项并替换
      // 使用 matchAll 获取所有匹配项
      const matches = Array.from(original.matchAll(regex))
      if (matches.length === 0) return original // 如果没有匹配项，直接返回原字符串

      // 获取最后一个匹配项的起始位置和匹配内容
      const lastMatch = matches[matches.length - 1]
      const lastIndex = lastMatch.index!
      const matchedText = lastMatch[0]

      // 将字符串分为三部分：
      // 1. 最后匹配项之前的部分
      // 2. 最后匹配项（替换为 replaceTo）
      // 3. 最后匹配项之后的部分
      return (
        original.slice(0, lastIndex) +
        matchedText.replace(regex, replaceTo) +
        original.slice(lastIndex + matchedText.length)
      )

    case 'all':
    default:
      // 替换所有匹配项
      return original.replace(regex, replaceTo)
  }
}

/**
 *f 移除字符串
 * @param original - 原始字符串
 * @param match - 待替换的字符串
 * @param options - 匹配选项，支持是否忽略大小写、全字匹配
 * @returns - 返回修改后的字符串
 */
export function removeString(original: string, match: string, options?: ReplaceStringOptions) {
  return replaceString(original, match, '', options)
}

/**
 *f 移除字符串中的补零填充
 * @param original - 原始字符串
 * @returns - 返回修改后的字符串
 */
export function removeZeroPaddingString(original: string) {
  let regexStr = `\\b0+(\\d+)`
  const regex = new RegExp(regexStr, 'g')
  return original.replace(regex, '$1')
}

/**
 *f 填充字符串
 * @param original - 原始字符串
 * @param length - 填充长度
 * @param character - 填充字符
 * @param direction - 填充方向 'left' | 'right'
 * @returns - 返回修改后的字符串
 */
export function paddingString(
  original: string,
  character: string,
  length: number,
  direction: 'left' | 'right' = 'left'
): string {
  if (direction === 'left') {
    return original.padStart(length, character)
  } else {
    return original.padEnd(length, character)
  }
}

/**
 *f 给字符串中的文本进行补零填充
 * @param original - 原始字符串
 * @param length - 填充长度
 * @returns - 返回修改后的字符串
 */
export function zeroPaddingString(original: string, length: number): string {
  let regexStr = `(\\d+)`
  const regex = new RegExp(regexStr, 'g')
  return original.replace(regex, (match) => match.padStart(length, '0'))
}

interface RegexOptions {
  /** 是否忽略大小写 */
  ignoreCase?: boolean
  /** 是否全字匹配 */
  isExactMatch?: boolean
}

/**
 * 使用正则表达式替换字符串
 * @param original - 原始字符串
 * @param regexStr - 正则表达式的字符串表示
 * @param replaceTo - 替换目标
 * @param options - 正则选项
 * @returns - 替换后的字符串
 */
export function regexReplace(
  original: string,
  regexStr: string,
  replaceTo: string,
  options: RegexOptions = {}
): string {
  const { ignoreCase = false, isExactMatch = false } = options

  // 处理正则字符串，确保特殊字符被转义
  regexStr = isExactMatch ? `\\b${regexStr}\\b` : `${regexStr}`

  // 根据选项拼接flags
  let flags = 'g'
  if (ignoreCase) flags += 'i'

  // 创建正则表达式
  const regex = new RegExp(regexStr, flags)

  console.log(regex, replaceTo)
  // 执行替换并返回结果
  return original.replace(regex, replaceTo)
}
