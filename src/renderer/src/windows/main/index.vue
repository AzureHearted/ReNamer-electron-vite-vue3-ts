<template>
  <n-flex class="file-list" vertical :size="0">
    <div style="height: 100px; overflow: auto">
      <div v-for="item in pathListTableData" :key="item.rawData.path">{{ item.rawData.name }}</div>
    </div>
    <n-split
      style="flex: 1"
      direction="vertical"
      pane1-class="rule-list-table"
      pane2-class="file-list-table"
      :resize-trigger-size="4"
      :default-size="0.35"
      :min="0.2"
      :max="0.75"
      disabled
    >
      <template #1>
        <RuleListTable
          @update="(d) => (ruleListTableData = d)"
          style="height: 100%"
        ></RuleListTable>
      </template>
      <template #2>
        <FileListTable
          :rule-list="ruleList as TReNameRule[]"
          @update="(d) => (pathListTableData = d)"
          style="height: 100%"
        ></FileListTable>
      </template>
    </n-split>
  </n-flex>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import FileListTable from './table-path-list.vue'
import RuleListTable from './table-rule-list.vue'
import { PathTableData } from '@common/class/TablePathList'
import { RuleTableData } from '@common/class/TableRuleList'
import { TReNameRule } from '@common/class/ReNameRule'

const pathListTableData = ref<PathTableData[]>([])
const ruleListTableData = ref<RuleTableData[]>([])

//j 规则列表
const ruleList = computed(() => {
  return ruleListTableData.value.map((x) => x.rawData)
})

watch(
  ruleListTableData,
  (d) => {
    // console.log('数据更新(ruleListData)', d)
  },
  { deep: true }
)

watch(
  pathListTableData,
  (d) => {
    // console.log('数据更新(pathListData)', d)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.file-list {
  // overflow: hidden;
  height: 100%;
  padding-bottom: 4px;

  :deep(.rule-list-table) {
    // flex: 1;
    // overflow: hidden;
    // padding-top: 2px;
  }
  :deep(.file-list-table) {
    // flex: 60%;
    // padding-top: 2px;
    // background-color: wheat;
    // border: wheat 1px solid;
    // padding: 10px;
    // margin: 10px;
  }
}
</style>
