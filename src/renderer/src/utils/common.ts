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
