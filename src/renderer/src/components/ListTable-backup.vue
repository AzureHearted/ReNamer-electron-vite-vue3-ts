<template>
  <n-flex vertical :size="0" @dragover.prevent.stop="onDragOver" @drop.prevent.stop="onDrop">
    <n-flex size="small" align="center" style="flex: 0 0 26px">
      <n-button-group size="tiny">
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary"> 文件 </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary"> 分栏 </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary"> 选项 </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary"> 导出 </n-button>
        </n-dropdown>
      </n-button-group>
      <n-button tertiary size="tiny" type="info" @click="updateData"> 更新状态 </n-button>
    </n-flex>
    <div style="flex: 1">
      <vxe-table
        ref="tableRef"
        class="my-table-scrollbar"
        :data="tableData"
        size="mini"
        round
        border
        auto-resize
        height="100%"
        resizable
        show-overflow
        show-header-overflow
        :scroll-y="{ enabled: true, gt: 0 }"
        :row-config="{ keyField: 'path', drag: true, height: 26 }"
        :row-drag-config="{
          showIcon: false,
          trigger: 'cell',
          showGuidesStatus: false
        }"
        :resizable-config="{
          dragMode: 'fixed',
          isDblclickAutoWidth: true
        }"
        :sort-config="sortConfig"
        :checkbox-config="{
          labelField: 'state',
          checkField: 'enabled',
          showHeader: false,
          checkAll: true,
          reserve: true,
          isShiftKey: true
        }"
        @sort-change="onSortChange"
        @row-dragend="onRowDragend"
        @checkbox-all="onCheckboxAll"
        @checkbox-change="onCheckboxChange"
      >
        <vxe-column
          type="checkbox"
          field="state"
          title="状态"
          width="auto"
          sortable
          sort-type="string"
        >
          <template #default="{ row }">
            <n-icon
              color="#9bc000"
              size="16"
              style="position: absolute; left: 30px; top: 50%; transform: translateY(-50%)"
            >
              <IconOK v-if="row.state === 'ok'" />
              <IconConflict v-else-if="row.state === 'conflict'" />
            </n-icon>
          </template>
        </vxe-column>
        <vxe-column
          field="name"
          title="名称"
          drag-sort
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <vxe-column
          field="newName"
          title="新名称"
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <vxe-column
          field="num_in_name"
          title="名称中的数字"
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <vxe-column field="path" title="路径" sortable sort-type="string" width="auto"></vxe-column>
      </vxe-table>
    </div>
    <n-flex size="small" align="center" style="flex: 0 0 16px">
      <n-flex :size="0" align="center" style="width: 250px; font-size: 12px">
        {{ data?.length }}个文件，{{ listSelected.length }}个允许修改
      </n-flex>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  h,
  ref,
  reactive,
  computed,
  onMounted,
  defineModel,
  defineEmits,
  watch,
  isReactive,
  isRef,
  nextTick
} from 'vue'
import { buildUUID, extractNumberFromString, naturalCompare } from '../utils/common'
import type { RowData } from '../interface/ListDataTable'
import { ArrowForwardCircleSharp as IconOK, Warning as IconConflict } from '@vicons/ionicons5'
import type {
  VxeTableInstance,
  VxeTableComponent,
  VxeTableEvents,
  VxeTableDefines,
  VxeTablePropTypes
} from 'vxe-table'

const options = [
  {
    label: '选项1',
    key: 'option1',
    disabled: true
  },
  {
    label: '选项2',
    key: 'option2'
  },
  {
    label: '选项3',
    key: 'option3'
  },
  {
    label: '选项4',
    key: 'option4'
  }
]

// 原始数据
const data = defineModel('data', { type: Array<RowData>, default: [] })

// 表格数据定义
interface ITableData extends RowData {
  num_in_name: string
}

const tableData = computed<ITableData[]>(() => {
  return data.value.map((x) => {
    x.num_in_name = extractNumberFromString(x.name)
    return x as ITableData
  })
})

watch(
  tableData.value,
  (data) => {
    console.log('表格数据更新', data)
  },
  { deep: true }
)

// 被选中的表格数据
const listSelected = computed<ITableData[]>(() => {
  return tableData.value.filter((x) => x.enabled)
})

interface IProxyData extends ITableData {
  _X_ROW_KEY: string
}

//f 获取当前表格数据
function getReallyData(): RowData[] {
  // console.log("internalData", tableRef.value?.internalData);
  return (tableRef.value?.internalData.afterFullData as IProxyData[]).map((x) => {
    const { _X_ROW_KEY, num_in_name, ...rowData } = x
    return {
      ...rowData
    }
  })
}

function rowClassName(rowData: RowData) {
  if (listSelected.value.findIndex((x) => x.path === rowData.path) !== -1) {
    return 'row-selected'
  }
  return ''
}

//s 排序配置
const sortConfig = ref<VxeTablePropTypes.SortConfig<ITableData>>({
  trigger: 'cell',
  orders: ['asc', 'desc', null],
  //f 自定义排序方法
  sortMethod({ data, sortList }) {
    const sortItem = sortList[0]
    // 取出第一个排序的列
    const { field, order } = sortItem
    let list: ITableData[] = []
    list = data.sort((a, b) => {
      let aVal = a[field] as unknown as string
      let bVal = b[field] as unknown as string

      if (field === 'state') {
        aVal = String(a.enabled) + a.state + a.path
        bVal = String(b.enabled) + b.state + b.path
      }
      if (order === 'asc') {
        return naturalCompare(aVal, bVal)
      } else if (order === 'desc') {
        return naturalCompare(bVal, aVal)
      } else {
        return 0
      }
    })
    return list
  }
})

const tableRef = ref<VxeTableInstance>()

const onSortChange: VxeTableEvents.SortChange = (params) => {
  // console.log("handleSort", params);
  updateData()
}

const onRowDragend: VxeTableEvents.RowDragend = (params) => {
  // console.log("onRowDragend", params);
  updateData()
}

const onCheckboxChange: VxeTableEvents.CheckboxChange = (params) => {
  // console.log("checkbox变化", params);
  updateData()
}
const onCheckboxAll: VxeTableEvents.CheckboxAll = (params) => {
  // console.log("checkbox全选", params);
  updateData()
}

const emits = defineEmits<{
  (e: 'update', data: RowData[]): void
}>()

// 更新data数据
function updateData() {
  console.log('更新数据：', getReallyData())
  // data.value = [...getReallyData()];
  emits('update', getReallyData())
}

function onDragOver(e: DragEvent) {
  // console.log("dragOver");
}

const { ipcRenderer } = window.require('electron')
ipcRenderer.on('receive-file-paths', (event, filePaths) => {
  console.log('File paths received:', filePaths)
  // 在这里可以将文件路径显示在UI中
})

declare global {
  interface Window {
    require: NodeRequire
  }
}

// import fs from 'fs/promises'

async function onDrop(e: DragEvent) {
  // 检查拖拽数据
  if (!e.dataTransfer || !e.dataTransfer.items) return

  const files = e.dataTransfer.files
  let newFiles: RowData[] = []

  newFiles = await processFiles(files, { recursive: true })

  //去除已经存在的数据
  newFiles = newFiles.filter((x) => {
    return !data.value.some((y) => y.path === x.path)
  })
  // 输出最终结果：一个包含所有文件信息的数组
  // console.log(fileDetails)
  data.value.push(...newFiles)
}

// 递归遍历文件夹内容
async function processFiles(
  files: FileList,
  options: { recursive?: boolean; matchFiles?: boolean; matchFolders?: boolean } = {}
) {
  const fs = window.require('fs').promises
  const path = window.require('path')
  const fileDetails: RowData[] = []

  const defaultOptions = {
    recursive: true,
    matchFiles: true,
    matchFolders: false
  }

  const finalOptions = { ...defaultOptions, ...options }

  async function processFile(filePath: string) {
    try {
      const stats = await fs.stat(filePath)
      const isDirectory = stats.isDirectory()

      if (isDirectory) {
        if (finalOptions.matchFolders) {
          fileDetails.push({
            enabled: true,
            state: 'ok',
            name: path.basename(filePath),
            newName: path.basename(filePath),
            path: filePath,
            size: stats.size,
            isDirectory: isDirectory
          })
        }
        if (finalOptions.recursive) {
          const dirFiles = await fs.readdir(filePath)
          for (const dirFile of dirFiles) {
            await processFile(path.join(filePath, dirFile))
          }
        }
      } else {
        if (finalOptions.matchFiles) {
          fileDetails.push({
            enabled: true,
            state: 'ok',
            name: path.basename(filePath),
            newName: path.basename(filePath),
            path: filePath,
            size: stats.size,
            isDirectory: isDirectory
          })
        }
      }
    } catch (err) {
      console.error('获取文件信息失败:', err)
    }
  }

  for (let i = 0; i < files.length; i++) {
    await processFile(files[i].path)
  }

  return fileDetails
}

//f 递归遍历文件夹内容
</script>

<style lang="scss" scoped>
:deep(.row-selected td) {
  background: #0078d7 !important;
  color: black;
}
:deep(*) {
  user-select: none;
}

.my-table-scrollbar {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
}

/** 默认模式 */
[data-vxe-ui-theme='light'] {
  .my-table-scrollbar {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      // background-color: #bfbfbf;
      background-color: rgba(191, 191, 191, 0.5);
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:active {
      background-color: #787878;
    }
  }
}

/** 暗黑模式 */
[data-vxe-ui-theme='dark'] {
  .my-table-scrollbar {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #151518;
    }
    ::-webkit-scrollbar-thumb {
      // background-color: #bfbfbf;
      background-color: rgba(191, 191, 191, 0.5);
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:active {
      background-color: #a3a6ad;
    }
  }
}
</style>
