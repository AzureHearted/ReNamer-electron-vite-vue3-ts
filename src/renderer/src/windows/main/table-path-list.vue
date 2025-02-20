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
      <n-button tertiary size="tiny" type="info" @click="updateTableData({ toReName: true })">
        <template #icon>
          <n-icon>
            <IconMagnify />
          </n-icon>
        </template>
        预览
      </n-button>
      <!-- <div style="position: absolute">
        {{ ruleList }}
      </div> -->
    </n-flex>
    <div class="table-container">
      <vxe-table
        ref="tableRef"
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
          title="状态"
          sortable
          :width="54"
          sort-type="string"
          fixed="left"
          :resizable="false"
        >
          <template #default="{ row }: VxeColumnSlotTypes.DefaultSlotParams<PathTableData>">
            <n-icon
              color="#9bc000"
              size="16"
              style="position: absolute; left: 30px; top: 50%; transform: translateY(-50%)"
            >
              <IconOK v-if="row.rawData.state === 'ok'" />
              <IconConflict v-else-if="row.rawData.state === 'conflict'" />
            </n-icon>
          </template>
        </vxe-column>
        <vxe-column
          field="rawData.name"
          title="名称"
          drag-sort
          sortable
          sort-type="string"
          :width="200"
          fixed="left"
        ></vxe-column>
        <vxe-column
          field="rawData.newName"
          title="新名称"
          sortable
          sort-type="string"
          :width="200"
          fixed="left"
        ></vxe-column>
        <vxe-column
          field="rawData.ext"
          title="扩展名"
          sortable
          sort-type="string"
          width="auto"
          fixed="left"
        >
          <template #default="{ row }: VxeColumnSlotTypes.DefaultSlotParams<PathTableData>">
            <n-icon :color="row.rawData.isDirectory ? '#ffd86b' : '#999999'">
              <IconFolder v-if="row.rawData.isDirectory" />
              <IconFile v-else />
            </n-icon>
            {{ row.rawData.ext }}
          </template>
        </vxe-column>
        <vxe-column
          field="rawData.num_in_name"
          title="名称中的数字"
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <vxe-column
          field="rawData.path"
          title="路径"
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <vxe-column
          field="rawData.parent"
          title="所在目录"
          sortable
          sort-type="string"
          width="auto"
        ></vxe-column>
        <template #empty>
          <div class="table-empty">拖拽文件到此处</div>
        </template>
      </vxe-table>
    </div>
    <n-flex class="table-detail-box" size="small" align="center">
      <n-flex :size="0" align="center" style="width: 250px; font-size: 12px">
        {{ tableData?.length }}个文件，{{ listSelected.length }}个允许修改
      </n-flex>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch } from 'vue'
import { naturalCompare } from '@renderer/utils/common'
import { Folder16Filled as IconFolder } from '@vicons/fluent'
import { InsertDriveFileRound as IconFile } from '@vicons/material'
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
import { Magnify as IconMagnify } from '@vicons/carbon'
import type {
  VxeTableInstance,
  VxeTableEvents,
  VxeTablePropTypes,
  VxeColumnSlotTypes
} from 'vxe-table'
import { useVxeTableFunc } from './common/hook/useVxeTable'
import { PathTableData } from '@common/class/TablePathList'
import { safeGetObjectValue } from '@common/utils/objectUtils'
import { TReNameRule } from '@common/class/ReNameRule'
import { ReName } from '@common/utils/ReName'

const props = withDefaults(defineProps<{ ruleList: TReNameRule[] }>(), {
  ruleList: () => [] // 重命名规则的规则列表
})

const emits = defineEmits<{
  (e: 'update', data: PathTableData[]): void
}>()

//s 表格实例对象
const tableRef = ref<VxeTableInstance>()

//s 表格数据
const tableData = ref<PathTableData[]>([])
//s 结构出对象方法
const { getFullData, getCurrentTableData, insertAt } = useVxeTableFunc<PathTableData>(tableRef)

//f 更新表格数据
function updateTableData(options: { toReName?: boolean } | undefined = {}) {
  const { toReName } = options
  if (toReName) {
    // 触发重命名更新
    updateReName()
  }
  // 更新tableData
  tableData.value = getCurrentTableData()
  // 触发更新事件
  emits('update', tableData.value)
}

//s 被选中的表格数据
const listSelected = computed<PathTableData[]>(() => {
  return tableData.value.filter((x) => x.rawData.enable)
})

const onSortChange: VxeTableEvents.SortChange = (_params) => {
  // console.log('handleSort', _params)
  // const { field } = _params
  updateTableData()
}

const onRowDragend: VxeTableEvents.RowDragend = (_params) => {
  console.log('onRowDragend', _params)
  updateTableData({ toReName: true })
}

const onCheckboxChange: VxeTableEvents.CheckboxChange = (_params) => {
  // console.log('checkbox变化', _params)
  updateTableData({ toReName: true })
}
const onCheckboxAll: VxeTableEvents.CheckboxAll = (_params) => {
  // console.log("checkbox全选", _params);
  updateTableData({ toReName: true })
}

//s 行配置信息
const rowConfig = ref<VxeTablePropTypes.RowConfig<PathTableData>>({
  keyField: 'rawData.path',
  drag: true,
  height: 26,
  isCurrent: true,
  isHover: true
})

//s 排序配置项
const sortConfig = ref<VxeTablePropTypes.SortConfig<PathTableData>>({
  trigger: 'cell',
  orders: ['asc', 'desc', null],
  //f 自定义排序方法
  sortMethod({ data, sortList }) {
    const sortItem = sortList[0]
    // 取出第一个排序的列
    const { field, order } = sortItem
    let list: PathTableData[] = []
    list = data.sort((a, b) => {
      let aVal = safeGetObjectValue(a, field) as unknown as string
      let bVal = safeGetObjectValue(b, field) as unknown as string

      // 当排序字段为状态时，需要将状态值拼接到一起进行比较
      if (field === 'rawData.state') {
        aVal = String(a.rawData.enable) + a.rawData.state
        bVal = String(b.rawData.enable) + b.rawData.state
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
const rowDragConfig = ref<VxeTablePropTypes.RowDragConfig<PathTableData>>({
  showIcon: false,
  trigger: 'cell',
  showGuidesStatus: false
})

//s 列调整配置项
const resizableConfig = ref<VxeTablePropTypes.ResizableConfig<PathTableData>>({
  dragMode: 'fixed',
  isDblclickAutoWidth: true
})

//s 复选框配置项
const checkboxConfig = ref<VxeTablePropTypes.CheckboxConfig<PathTableData>>({
  labelField: 'rawData.state',
  checkField: 'rawData.enable',
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

// 拖拽过程中
function onDragOver(_e: DragEvent) {
  // console.log("dragOver");
}

// 拖拽放置
async function onDrop(e: DragEvent) {
  // 检查拖拽数据
  if (!e.dataTransfer || !e.dataTransfer.items) return
  const files = e.dataTransfer.files
  if (!files.length) return console.log('拖拽无效')

  let newFiles: PathTableData[] = (
    await window.api.getFiles(
      [...files].map((x) => x.path),
      { matchFolders: true }
    )
  ).map((x) => new PathTableData(x))
  // console.log('(拖拽成功)从主进程返回的文件信息:', newFiles)

  // 去除已经存在的数据
  newFiles = newFiles.filter((x) => {
    return !getFullData().some((y) => y.rawData.path === x.rawData.path)
  })

  // 输出最终结果：一个包含所有文件信息的数组
  // console.log(newFiles)
  if (newFiles.length > 0) {
    //* 向数据表中插入数据
    await insertAt(newFiles, -1)
    // 触发更新
    updateTableData({ toReName: true })
    // console.log('onDrop')
  }
}

//w 监听规则列表变化
watch(
  () => props.ruleList,
  (value) => {
    console.log('规则变化', value)
    updateReName()
  },
  { deep: true }
)

//f 更新重命名
function updateReName() {
  const ruleList = props.ruleList
  const tableData = getCurrentTableData()
  const list = tableData.map((x) => x.rawData)
  // console.log(
  //   `更新重命名:`,
  //   list.map((x) => x.name)
  // )

  console.log('触发重命名')
  ReName(list, ruleList)
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
