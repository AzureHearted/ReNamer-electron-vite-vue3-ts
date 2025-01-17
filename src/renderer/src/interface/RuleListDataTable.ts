export interface RowData {
  key: number
  name: string
  description: string
  enable: boolean
  isSelected: boolean
  [key: string]: unknown
}
