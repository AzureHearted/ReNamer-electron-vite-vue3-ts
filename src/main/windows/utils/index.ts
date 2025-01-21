import { nativeTheme } from 'electron'

//f 获取主题背景颜色
export function getThemeBackgroundColor() {
  return nativeTheme.shouldUseDarkColors ? '#181818' : '#FFFFFF'
}
