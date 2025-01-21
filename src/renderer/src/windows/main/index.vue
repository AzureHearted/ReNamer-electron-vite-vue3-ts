<template>
  <n-flex class="file-list" vertical :size="0">
    <div style="height: 100px; overflow: auto">
      <div v-for="item in data" :key="item.path">{{ item.name }}</div>
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
        <RuleListTable style="height: 100%"></RuleListTable>
      </template>
      <template #2>
        <FileListTable style="height: 100%" @update:data="(d) => (data = d)"></FileListTable>
      </template>
    </n-split>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileListTable from './table-file-list.vue'
import RuleListTable from './table-rule-list.vue'
import type { FileListTableData } from '@common/interface/TableFileListData'

const data = ref<FileListTableData[]>([])
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
