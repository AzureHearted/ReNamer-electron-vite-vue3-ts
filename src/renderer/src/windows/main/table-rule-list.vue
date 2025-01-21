<template>
  <n-flex vertical :size="0">
    <n-flex class="table-button-group" size="small" align="center">
      <n-button-group size="tiny">
        <n-button tertiary type="primary" @click="addRule">
          <template #icon>
            <n-icon>
              <Add />
            </n-icon>
          </template>
          添加
        </n-button>
        <n-button tertiary type="error">
          <template #icon>
            <n-icon>
              <Remove />
            </n-icon>
          </template>
          移除
        </n-button>
        <n-button tertiary>
          <template #icon>
            <n-icon>
              <ArrowUpCircle />
            </n-icon>
          </template>
          上移
        </n-button>
        <n-button tertiary>
          <template #icon>
            <n-icon>
              <ArrowDownCircle />
            </n-icon>
          </template>
          下移
        </n-button>
      </n-button-group>
    </n-flex>
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        class="table-scrollbar"
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
        <vxe-column type="checkbox" field="enable" title="#" width="auto">
          <template #default="{ $rowIndex }">
            {{ $rowIndex }}
          </template>
        </vxe-column>
        <vxe-column field="name" title="规则" drag-sort width="auto"></vxe-column>
        <vxe-column field="description" title="说明" width="auto"></vxe-column>
        <template #empty>
          <div class="table-empty" @click="addRule">点击此处来添加规则</div>
        </template>
      </vxe-table>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, computed, defineModel, defineEmits } from 'vue'
import {
  AddCircle as Add,
  RemoveCircle as Remove,
  ArrowUpCircle,
  ArrowDownCircle
} from '@vicons/ionicons5'
import { naturalCompare } from '@renderer/utils/common'
import type { RuleListTableData } from '@common/interface/TableRuleListData'
import type { VxeTableInstance, VxeTableEvents, VxeTablePropTypes } from 'vxe-table'

//s 原始数据
const data = defineModel<RuleListTableData[]>('data', { default: () => [] })

// 表格数据定义
interface ITableData extends RuleListTableData {}

const tableData = computed<ITableData[]>(() => {
  return data.value.map((x) => {
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

interface IProxyData extends ITableData {
  _X_ROW_KEY: string
}

const tableRef = ref<VxeTableInstance>()

//f 获取当前表格数据
function getReallyData(): RuleListTableData[] {
  // console.log("internalData", tableRef.value?.internalData);
  return (tableRef.value?.internalData.afterFullData as IProxyData[]).map((x) => {
    const { _X_ROW_KEY, num_in_name, ...rowData } = x
    return {
      ...rowData
    }
  })
}

const emits = defineEmits<{
  (e: 'update', data: RuleListTableData[]): void
}>()

//f 更新data数据
function updateData() {
  console.log('更新数据：', getReallyData())
  // data.value = [...getReallyData()];
  emits('update', getReallyData())
}

//f 新增规则
function addRule() {
  console.log('新增规则')
  window.api.openAddRuleWindow()
}
</script>

<style lang="scss" scoped>
//s 表格样式
.table-button-group {
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
</style>
