import type { SelectProps } from 'naive-ui'

// 扩展名选项
export const optionsExtInfo: SelectProps['options'] = [
  // 图片类1
  { label: '.jpeg (图片)', value: 'jpeg' },
  { label: '.jpg (图片)', value: 'jpg' },
  { label: '.gif (图片)', value: 'gif' },
  { label: '.png (图片)', value: 'png' },
  { label: '.bmp (图片)', value: 'bmp' },
  { label: '.webp (图片)', value: 'webp' },
  { label: '.tif (图片)', value: 'tif' },
  { label: '.tiff (图片)', value: 'tiff' },
  // 视频类
  { label: '.mp4 (视频)', value: 'mp4' },
  { label: '.avi (视频)', value: 'avi' },
  { label: '.mov (视频)', value: 'mov' },
  { label: '.mkv (视频)', value: 'mkv' },
  { label: '.wmv (视频)', value: 'wmv' },
  { label: '.mpg (视频)', value: 'mpg' },
  { label: '.mpeg (视频)', value: 'mpeg' },
  { label: '.flv (视频)', value: 'flv' },
  { label: '.ts (视频)', value: 'ts' },
  { label: '.rmvb (视频)', value: 'rmvb' },
  { label: '.webm (视频)', value: 'webm' },
  { label: '.ogv (视频)', value: 'ogv' },
  { label: '.3gp (视频)', value: '3gp' },
  { label: '.f4v (视频)', value: 'f4v' },
  // 图片类2
  { label: '.pgm (图片格式)', value: 'pgm' },
  { label: '.ppm (图片格式)', value: 'ppm' },
  { label: '.pgmyuv (图片格式)', value: 'pgmyuv' },
  { label: '.sgi (图片格式)', value: 'sgi' },
  { label: '.jxl (图片格式)', value: 'jxl' },
  // 压缩包类
  { label: '.zip (压缩包)', value: 'zip' },
  { label: '.7z (压缩包)', value: '7z' },
  { label: '.tar (压缩包)', value: 'tar' },
  { label: '.wim (压缩包)', value: 'wim' },
  // 文档类
  { label: '.doc (文档)', value: 'doc' },
  { label: '.docx (文档)', value: 'docx' },
  { label: '.xls (表格)', value: 'xls' },
  { label: '.xlsx (表格)', value: 'xlsx' },
  { label: '.ppt (演示文稿)', value: 'ppt' },
  { label: '.pptx (演示文稿)', value: 'pptx' },
  // 其他1
  { label: '.exe (可执行文件)', value: 'exe' },
  { label: '.dll (动态链接库)', value: 'dll' },
  { label: '.ini (配置文件)', value: 'ini' },
  // 其他2
  { label: '.c (源代码)', value: 'c' },
  { label: '.cpp (源代码)', value: 'cpp' }
]

export function useExtensionSelect() {
  return {}
}
