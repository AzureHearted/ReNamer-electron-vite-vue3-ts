import { NIcon } from 'naive-ui'
import { ExtensionPuzzleOutline as IconPuzzle } from '@vicons/ionicons5'
import { NDropdown } from 'naive-ui'
import type { MentionOption, DropdownProps } from 'naive-ui'
import { h, VNodeChild } from 'vue'
import { fuzzyPinyinFilter } from '@renderer/utils/common'

//s 元信息插入项
export const optionsMetaInfo: DropdownProps['options'] = [
  {
    label: '当前日期',
    value: 'Date_Now:'
  },
  {
    label: '文件完整名称',
    value: 'File_FileName:'
  },
  {
    label: '文件基名称',
    value: 'File_BaseName:'
  },
  {
    label: '文件扩展名',
    value: 'File_Extension:'
  },
  {
    label: '父文件夹名称',
    value: 'File_FolderPath:'
  },
  {
    label: '文件大小',
    value: 'File_Size:'
  },
  {
    label: '文件大小 (字节)',
    value: 'File_SizeBytes:'
  },
  {
    label: '文件大小 (KB)',
    value: 'File_SizeKB:'
  },
  {
    label: '文件大小 (MB)',
    value: 'File_SizeMB:'
  },
  {
    label: '文件大小 (GB)',
    value: 'File_SizeGB:'
  },
  {
    label: '文件创建日期',
    value: 'File_DataCreated:'
  },
  {
    label: '文件修改日期',
    value: 'File_DataModify:'
  },
  {
    label: '文件 MD5 哈希值',
    value: 'Hash_MD5:'
  }
]

/** n-mention 的自定义渲染函数 */
function renderLabel(option: MentionOption): VNodeChild {
  return h('div', { style: 'display: flex; align-items: center;' }, [
    h(
      NIcon,
      {
        style: 'margin-right: 8px;'
      },
      { default: () => h(IconPuzzle) }
    ),
    `${option.label}`
  ])
}

/** n-mention 的自定义过滤器 */
function filter(pattern: string, option: MentionOption): boolean {
  return (
    fuzzyPinyinFilter(pattern, `${option.label}`) || fuzzyPinyinFilter(pattern, `${option.value}`)
  )
}

/** 使用自定义Meta n-mention  */
export function useMetaMention() {
  return {
    /** n-mention 的自定义渲染函数 */
    renderLabel,
    /** n-mention 的自定义过滤器 */
    filter
  }
}
