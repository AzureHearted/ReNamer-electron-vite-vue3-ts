// "添加规则" 公用变量
import { ReNameInsertRule } from '@common/interface/ReNamerRule'
import { NDropdown } from 'naive-ui'

//s 元信息选项
export const optionsMetaInfo: InstanceType<typeof NDropdown>['options'] = [
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

