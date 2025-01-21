// 公共工具库
import { pinyin } from 'pinyin-pro'

//f 自然排序函数
export function naturalCompare<T extends string | number | boolean>(
  a: T | undefined,
  b: T | undefined
): number {
  if (a === b) return 0 // 如果相等，返回 0

  // 转换为字符串进行比较
  const aStr = String(a)
  const bStr = String(b)

  return aStr.localeCompare(bStr, undefined, {
    numeric: true,
    sensitivity: 'base'
  })
}

//f [功能封装]生成uuid
export function buildUUID(): string {
  const hexList: string[] = []
  for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16)
  }
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}

//f 提取字符串中的数字(生成新字符串)
export function extractNumberFromString(str: string): string {
  return str.replace(/[^0-9]/gi, '')
}

//f 拼音模糊搜索过滤器函数
export function fuzzyPinyinFilter(
  pattern: string,
  text: string,
  defaultMatch: boolean | undefined = true
): boolean {
  if (!pattern || !text) return defaultMatch

  // 转换为小写，忽略大小写
  const lowerPattern = pattern.toLowerCase()
  const lowerText = text.toLowerCase()

  // 如果直接包含英文/中文匹配
  if (lowerText.includes(lowerPattern)) return true

  // 获取文本的拼音表示
  const textPinyinArray = pinyin(lowerText, { type: 'array' })
  const textPinyin = textPinyinArray.map((item) => item[0]).join('')

  // 如果拼音包含搜索模式
  if (textPinyin.includes(lowerPattern)) return true

  // 拼音首字母匹配
  const textInitials = textPinyinArray.map((item) => item[0][0]).join('')
  if (textInitials.includes(lowerPattern)) return true

  return false
}
