<template>
  <n-flex vertical :size="0">
    <n-button-group size="tiny" style="flex: 0 0 26px">
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
    <n-data-table
      style="flex: 1"
      size="small"
      :columns="columns"
      :data="sortedData"
      :single-line="false"
      :row-props="rowProps"
      flex-height
      virtual-scroll
      @update-sorter="handleSort"
    />
  </n-flex>
</template>

<script setup lang="ts">
import type { DataTableColumns, DataTableSortState } from 'naive-ui'
import { NCheckbox } from 'naive-ui'
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
  isRef
} from 'vue'
import type { HTMLAttributes } from 'vue'
import {
  AddCircle as Add,
  RemoveCircle as Remove,
  ArrowUpCircle,
  ArrowDownCircle
} from '@vicons/ionicons5'
import { naturalCompare } from '@renderer/utils/common'
import type { RowData } from '@renderer/interface/RuleListDataTable'

//s 列的定义
const columns: DataTableColumns<RowData> = [
  {
    title: '启用',
    key: 'enable',
    width: 50,
    fixed: 'left',
    render(rowData, rowIndex) {
      return h('div', { style: 'display: flex;align-items: center;gap:4px;' }, [
        h(NCheckbox, {
          checked: rowData.enable,
          onUpdateChecked: () => (rowData.enable = !rowData.enable)
        }),
        rowIndex
      ])
    }
  },
  {
    title: '规则',
    key: 'name',
    resizable: true,
    width: 150,
    minWidth: 120,
    maxWidth: 400,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
    // sorter: (r1, r2) => naturalCompare(r1.name, r2.name),
  },
  {
    title: '说明',
    key: 'description',
    minWidth: 100,
    maxWidth: 500,
    ellipsis: {
      tooltip: true
    }
    // sorter: (r1, r2) => naturalCompare(r1.name, r2.name),
  }
]

//s 初始数据
const data = defineModel('data', { type: Array<RowData>, default: [] })

//s 排序器
const sorter = ref<DataTableSortState | null>(null)

//j 排序后的数据
const sortedData = computed<RowData[]>(() => {
  if (sorter.value == null) return [...data.value]
  const { columnKey, order } = sorter.value
  return [...data.value].sort((a, b) => {
    const a_key = a[columnKey] as unknown as string
    const b_key = b[columnKey] as unknown as string
    if (order === 'ascend') {
      return naturalCompare(a_key, b_key)
    } else if (order === 'descend') {
      return naturalCompare(b_key, a_key)
    } else {
      return 0
    }
  })
})

//s 最近一次鼠标点击的行的Key(只有鼠标单击或按住Ctrl单击时会记录)
let currentClickKey: number | null = null

//s 选中列的Key列表
const listSelected = reactive<number[]>([])

function rowProps(row: RowData, rowIndex: number): HTMLAttributes {
  return {
    onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.classList.value.includes('n-checkbox-box__border')) return
      if (e.ctrlKey) {
        currentClickKey = row.key
        if (!listSelected.includes(row.key)) {
          listSelected.push(row.key)
        } else {
          const index = listSelected.findIndex((x) => x === row.key)
          listSelected.splice(index, 1)
        }
      } else if (e.shiftKey) {
        if (listSelected.length < 1) {
          listSelected.push(row.key)
        } else {
          const currentIndex = sortedData.value.findIndex((x) => x.key === currentClickKey)
          const targetIndex = sortedData.value.findIndex((x) => x.key === row.key)
          const firstIndex = Math.min(currentIndex, targetIndex)
          const latestIndex = Math.max(currentIndex, targetIndex)
          console.log(currentIndex, targetIndex)
          listSelected.splice(0)
          listSelected.push(
            ...sortedData.value
              .filter((x, index) => index >= firstIndex && index <= latestIndex)
              .map((x) => x.key)
          )
        }
      } else {
        currentClickKey = row.key
        listSelected.splice(0)
        listSelected.push(row.key)
      }

      console.log(listSelected)
    }
  }
}

//f 发生排序时的回调
function handleSort(sortInfo: DataTableSortState) {
  // console.log("发生排序", sortInfo);
  sorter.value = sortInfo
  updateData()
}

const emits = defineEmits<{
  update: (data: RowData[]) => void
}>()

//f 更新data数据(初始数据)
function updateData() {
  console.log('更新数据：', sortedData.value)
  data.value = [...sortedData.value]
}

//f 新增规则
function addRule() {
  console.log('新增规则')
}
</script>

<style lang="sass"></style>
