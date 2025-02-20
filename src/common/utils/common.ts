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

/**
 *f 提取字符串中的数字(生成新字符串)
 * @param str 字符串
 * @returns 字符串中的数字字符串
 */
export function extractNumberFromString(str: string): string {
  return str.replace(/[^0-9]/gi, '')
}


