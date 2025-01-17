export interface RowData {
  path: string
  name: string
  newName: string
  state: 'ok' | 'conflict' | 'error'
  enabled: boolean
  isDirectory: boolean
  size: number
  [key: string]: unknown
}
