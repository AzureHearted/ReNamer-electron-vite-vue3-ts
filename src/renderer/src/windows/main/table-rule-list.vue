<template>
  <n-flex vertical :size="0">
    <n-flex class="table-button-group" size="small" align="center">
      <n-button-group size="tiny">
        <n-button tertiary type="primary" @click="addRule">
          <template #icon>
            <n-icon>
              <IconAdd />
            </n-icon>
          </template>
          添加
        </n-button>
        <n-button tertiary type="error" @click="removeRule">
          <template #icon>
            <n-icon>
              <IconRemove />
            </n-icon>
          </template>
          移除
        </n-button>
        <n-button tertiary>
          <template #icon>
            <n-icon>
              <IconArrowUp />
            </n-icon>
          </template>
          上移
        </n-button>
        <n-button tertiary>
          <template #icon>
            <n-icon>
              <IconArrowDown />
            </n-icon>
          </template>
          下移
        </n-button>
      </n-button-group>
    </n-flex>
    <!-- * 表格 -->
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        class="table-scrollbar"
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
        :checkbox-config="checkboxConfig"
        header-row-class-name="table-header"
        @sort-change="onSortChange"
        @row-dragend="onRowDragend"
        @checkbox-all="onCheckboxAll"
        @checkbox-change="onCheckboxChange"
        @cell-dblclick="cellDbClick"
        @dblclick="addRule"
      >
        <vxe-column type="checkbox" title="#" width="auto">
          <template #default="{ $rowIndex }">
            {{ $rowIndex }}
          </template>
        </vxe-column>
        <vxe-column field="rawData.name" title="规则" drag-sort width="auto"></vxe-column>
        <vxe-column field="rawData.description" title="说明"></vxe-column>
        <template #empty>
          <div class="table-empty">点击此处来添加规则</div>
        </template>
      </vxe-table>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const { ipcRenderer } = window.electron
import {
  AddCircle as IconAdd,
  RemoveCircle as IconRemove,
  ArrowUpCircle as IconArrowUp,
  ArrowDownCircle as IconArrowDown
} from '@vicons/ionicons5'
import type { VxeTableInstance, VxeTableEvents, VxeTablePropTypes } from 'vxe-table'
import { generateRuleByObj } from '@common/class/ReNameRule/utils/generateRuleByObj'
import { TReNameRule } from '@common/class/ReNameRule'
import { RuleTableData } from '@common/class/TableRuleList'
import { useVxeTableFunc } from './common/hook/useVxeTable'

const emits = defineEmits<{
  (e: 'update', data: RuleTableData[]): void
}>()

//s 表格实例
const tableRef = ref<VxeTableInstance>()
const { getFullData, getRowById, removeCurrentRow, insertAt, setRow } =
  useVxeTableFunc<RuleTableData>(tableRef)

//s 表格数据
const tableData = ref<RuleTableData[]>([])

//f 更新data数据
function updateTableData() {
  // console.log('表格数据更新', getFullData())
  const dataList = getFullData()
  tableData.value = dataList
  emits('update', dataList)
}

//s 行配置信息
const rowConfig = ref<VxeTablePropTypes.RowConfig<RuleTableData>>({
  keyField: 'rawData.id',
  drag: true,
  height: 26,
  isCurrent: true,
  isHover: true
})

//s 行拖拽排序配置项
const rowDragConfig = ref<VxeTablePropTypes.RowDragConfig<RuleTableData>>({
  showIcon: false,
  trigger: 'cell',
  showGuidesStatus: false
})

//s 列调整配置项
const resizableConfig = ref<VxeTablePropTypes.ResizableConfig<RuleTableData>>({
  dragMode: 'fixed',
  isDblclickAutoWidth: true
})

//s 复选框配置项
const checkboxConfig = ref<VxeTablePropTypes.CheckboxConfig<RuleTableData>>({
  labelField: 'rawData.state',
  checkField: 'rawData.enable',
  showHeader: false,
  checkAll: true,
  reserve: true,
  isShiftKey: true
})

const onSortChange: VxeTableEvents.SortChange<RuleTableData> = (_params) => {
  // console.log("handleSort", _params);
  updateTableData()
}

const onRowDragend: VxeTableEvents.RowDragend<RuleTableData> = (_params) => {
  // console.log("onRowDragend", _params);
  updateTableData()
}

const onCheckboxChange: VxeTableEvents.CheckboxChange<RuleTableData> = (_params) => {
  // console.log("checkbox变化", _params);
  updateTableData()
}
const onCheckboxAll: VxeTableEvents.CheckboxAll<RuleTableData> = (_params) => {
  // console.log("checkbox全选", _params);
  updateTableData()
}

//f 新增规则
async function addRule(_e: MouseEvent) {
  _e.stopPropagation()
  const { type } = _e
  const clickTarget = _e.target as HTMLElement
  const targetClassList = [...clickTarget.classList]
  const targetClassName = clickTarget.className
  if (targetClassName.includes('checkbox')) return
  // console.log(`(${type})鼠标点击位置：`, clickTarget, targetClassList, targetClassName)
  if (type === 'click') {
    window.api.main.openWindowToAddRule()
  } else if (type === 'dblclick') {
    // 限定点击区域
    if (
      targetClassList.includes('table-empty') ||
      targetClassList.includes('vxe-table--body-wrapper')
    ) {
      window.api.main.openWindowToAddRule()
    }
  }
}

//s 监听新增规则事件
ipcRenderer.on('add-rule', (_event, ruleObj: TReNameRule) => {
  const rule = generateRuleByObj(ruleObj)
  if (!rule) throw new Error('新增规则出错！')
  const newItem = new RuleTableData(rule)
  insertAt(newItem, -1)
  updateTableData()
})

//f 单元格双击事件
const cellDbClick: VxeTableEvents.CellDblclick<RuleTableData> = ({ row, column }) => {
  const rule = row.rawData
  if (column.type !== 'checkbox') {
    editRule(rule)
  }
}

//f 编辑规则
function editRule(rule: TReNameRule) {
  console.log('编辑规则', rule)
  window.api.main.openWindowToEditRule(JSON.parse(JSON.stringify(rule)))
}

//s 监听更新规则事件
ipcRenderer.on('update-rule', (_event, ruleObj: TReNameRule) => {
  const rule = generateRuleByObj(ruleObj)
  console.log('更新规则', rule)
  if (!rule) throw new Error('更新规则出错！')
  // 根据id查找规则
  const row = getRowById(rule.id)
  if (!row) throw new Error(`未找到id：${rule.id} 对应的规则行`)
  setRow(row, new RuleTableData(rule))
  updateTableData()
})

//f 移除规则
async function removeRule() {
  console.log('删除规则', await removeCurrentRow())
  updateTableData()
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
  user-select: none;

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
      // user-select: none;
    }
  }
}
</style>
