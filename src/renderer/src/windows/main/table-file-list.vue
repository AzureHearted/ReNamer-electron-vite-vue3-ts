<template>
  <n-flex vertical :size="0" @dragover.prevent.stop="onDragOver" @drop.prevent.stop="onDrop">
    <n-flex class="table-header-menu" size="small" align="center">
      <n-button-group size="tiny">
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary">
            <template #icon>
              <n-icon>
                <IconFiles />
              </n-icon>
            </template>
            文件
          </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary">
            <template #icon>
              <n-icon>
                <IconSubolumn />
              </n-icon>
            </template>
            分栏
          </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary">
            <template #icon>
              <n-icon>
                <IconOptions />
              </n-icon>
            </template>
            选项
          </n-button>
        </n-dropdown>
        <n-dropdown trigger="click" :options="options">
          <n-button tertiary type="primary">
            <template #icon>
              <n-icon>
                <IconExportToFile />
              </n-icon>
            </template>
            导出
          </n-button>
        </n-dropdown>
        <n-button tertiary type="primary">
          <template #icon>
            <n-icon>
              <IconFilter />
            </n-icon>
          </template>
          筛选器
        </n-button>
      </n-button-group>
      <n-button tertiary size="tiny" type="info" @click="updateData"> 更新状态 </n-button>
      <!-- <div style="position: absolute">
        {{ data }}
      </div> -->
    </n-flex>
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        :data="tableData"
        size="mini"
        height="100%"
        auto-resize
        round
        border
        resizable
        show-overflow
        show-header-overflow
        :scroll-y="{ enabled: true, gt: 0, immediate: true }"
        :row-config="rowConfig"
        :row-drag-config="rowDragConfig"
        :resizable-config="resizableConfig"
        :sort-config="sortConfig"
        :checkbox-config="checkboxConfig"
        header-row-class-name="table-header"
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
        <template #empty>
          <div class="table-empty">拖拽文件到此处</div>
        </template>
      </vxe-table>
    </div>
    <n-flex class="table-detail-box" size="small" align="center">
      <n-flex :size="0" align="center" style="width: 250px; font-size: 12px">
        {{ data?.length }}个文件，{{ listSelected.length }}个允许修改
      </n-flex>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, computed, defineModel, defineEmits, watch, reactive } from 'vue'
import { extractNumberFromString, naturalCompare } from '@renderer/utils/common'
import type { FileListTableData } from '@common/interface/TableFileListData'
import {
  ArrowForwardCircleSharp as IconOK,
  Warning as IconConflict,
  FileTray as IconFiles,
  Options as IconOptions,
  FilterCircle as IconFilter
} from '@vicons/ionicons5'
import {
  ColumnTripleEdit24Filled as IconSubolumn,
  DocumentArrowDown16Filled as IconExportToFile
} from '@vicons/fluent'
import type {
  VxeTableInstance,
  VxeTableEvents,
  VxeTablePropTypes,
  VxeComponentStyleType
} from 'vxe-table'

//s 原始数据
const data = defineModel<FileListTableData[]>('data', { default: () => [] })

// 表格数据定义
interface ITableData extends FileListTableData {
  num_in_name: string
}

const tableData = computed<ITableData[]>(() => {
  return data.value.map((x) => {
    x.num_in_name = extractNumberFromString(x.name)
    return x as ITableData
  })
})

//s 行配置信息
const rowConfig = ref<VxeTablePropTypes.RowConfig<ITableData>>({
  keyField: 'path',
  drag: true,
  height: 26
})

//s 排序配置项
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

//s 行拖拽排序配置项
const rowDragConfig = ref<VxeTablePropTypes.RowDragConfig<ITableData>>({
  showIcon: false,
  trigger: 'cell',
  showGuidesStatus: false
})

//s 列调整配置项
const resizableConfig = ref<VxeTablePropTypes.ResizableConfig<ITableData>>({
  dragMode: 'fixed',
  isDblclickAutoWidth: true
})

//s 复选框配置项
const checkboxConfig = ref<VxeTablePropTypes.CheckboxConfig<ITableData>>({
  labelField: 'state',
  checkField: 'enabled',
  showHeader: false,
  checkAll: true,
  reserve: true,
  isShiftKey: true
})

//s 菜单按钮选项
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

watch(
  () => tableData,
  (_value) => {
    // console.log('tableData数据更新', _value)
  },
  { deep: true }
)
watch(
  () => data,
  (_value) => {
    // console.log('data数据更新', _value)
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

const tableRef = ref<VxeTableInstance>()

const onSortChange: VxeTableEvents.SortChange = (_params) => {
  // console.log("handleSort", _params);
  updateData()
}

const onRowDragend: VxeTableEvents.RowDragend = (_params) => {
  // console.log("onRowDragend", _params);
  updateData()
}

const onCheckboxChange: VxeTableEvents.CheckboxChange = (_params) => {
  // console.log("checkbox变化", _params);
  updateData()
}
const onCheckboxAll: VxeTableEvents.CheckboxAll = (_params) => {
  // console.log("checkbox全选", _params);
  updateData()
}

//f 获取当前表格数据
function getReallyData(): FileListTableData[] {
  // console.log("internalData", tableRef.value?.internalData);
  return (tableRef.value?.internalData.afterFullData as IProxyData[]).map((x) => {
    const { _X_ROW_KEY, num_in_name, ...rowData } = x
    return {
      ...rowData
    }
  })
}

const emits = defineEmits<{
  (e: 'update', data: FileListTableData[]): void
}>()

//f 更新data数据
function updateData() {
  console.log('更新数据：', getReallyData())
  // data.value = [...getReallyData()];
  emits('update', getReallyData())
}

function onDragOver(_e: DragEvent) {
  // console.log("dragOver");
}

async function onDrop(e: DragEvent) {
  // 检查拖拽数据
  if (!e.dataTransfer || !e.dataTransfer.items) return

  const files = e.dataTransfer.files
  let newFiles: FileListTableData[] = []

  // console.log('准备发送到主进程', files)
  newFiles = await window.api.getFiles([...files].map((x) => x.path))

  console.log('从主进程返回的文件信息:', newFiles)

  //去除已经存在的数据
  newFiles = newFiles.filter((x) => {
    return !data.value.some((y) => y.path === x.path)
  })

  // 输出最终结果：一个包含所有文件信息的数组
  // console.log(newFiles)
  if (newFiles.length > 0) {
    data.value = data.value.concat(newFiles)
  }
  // console.log(data.value)
}
</script>

<style lang="scss" scoped>
:deep(.row-selected td) {
  background: #0078d7 !important;
  color: black;
}
:deep(*) {
  user-select: none;
}

//s 表格头部菜单按钮组样式
.table-header-menu {
  height: 28px;
  padding: 0 4px;
}

//s 表格容器样式
.table-container {
  flex: 1;
  overflow: hidden;

  :deep(.table-header) {
    .vxe-header--column {
      height: 24px !important;
    }
  }

  :deep(.vxe-table--empty-content) {
    width: 100%;
    height: 100%;
    .table-empty {
      width: 100%;
      height: 100%;
      // background: white;
      font-size: large;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }
  }
}

//s 表格详情信息样式
.table-detail-box {
  height: 20px;
  padding: 0 4px;
}
</style>
