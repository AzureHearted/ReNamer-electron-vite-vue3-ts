import type { Ref } from 'vue'
import { VxeTableInstance } from 'vxe-table'

/**
 ** 使用Vxe表格实例方法
 * @param tableRef Vxe表格ref实例
 * @returns
 */
export function useVxeTableFunc<T>(tableRef: Ref<VxeTableInstance | undefined>) {
  /**
   * 获取表格数据
   */
  function getFullData(): T[] {
    const $table = tableRef.value
    if (!$table) return []
    return $table.getFullData()
  }

  /**
   * 获取当前表格数据
   */
  function getCurrentTableData(): T[] {
    const $table = tableRef.value
    if (!$table) return []
    return $table.getTableData().visibleData
  }

  /**
   * 通用id获取表格行数据
   */
  function getRowById(rowid: string | number | null): T | null {
    const $table = tableRef.value
    if (!$table) return null
    return $table.getRowById(rowid)
  }

  /**
   * 获取当前选中的行
   */
  function getCurrentRecord(): T | null {
    const $table = tableRef.value
    if (!$table) return null
    return $table.getCurrentRecord()
  }

  /**
   * 删除当前选中的行
   */
  async function removeCurrentRow(): Promise<{ row: T; rows: T[] } | null> {
    const $table = tableRef.value
    if (!$table) return null
    return $table.removeCurrentRow()
  }

  /**
   * 往表格指定行中插入数据
   */
  async function insertAt(
    records: T | T[],
    targetRow?: T | -1 | null
  ): Promise<{ row: T; rows: T[] } | null> {
    const $table = tableRef.value
    if (!$table) return null
    return $table.insertAt(records, targetRow)
  }

  /**
   * 修改行数据
   */
  async function setRow(rows: T | T[], record?: T): Promise<void | null> {
    const $table = tableRef.value
    if (!$table) return null
    $table.setRow(rows, record)
  }

  /**
   * 删除指定行
   */
  async function removeRow(rows?: T | T[]): Promise<{ row: T; rows: T[] } | null> {
    const $table = tableRef.value
    if (!$table) return null
    return $table.remove(rows)
  }

  /**
   * 根据 row 获取相对于当前数据中的索引
   */
  function getVTRowIndex(row: T): number {
    const $table = tableRef.value
    if (!$table) return -1
    return $table.getVTRowIndex(row)
  }

  return {
    getFullData,
    getCurrentTableData,
    getRowById,
    getCurrentRecord,
    removeCurrentRow,
    insertAt,
    setRow,
    removeRow,
    getVTRowIndex
  }
}
