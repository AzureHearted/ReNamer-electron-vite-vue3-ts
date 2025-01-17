<template>
  <n-flex class="main" vertical :size="5">
    <div style="flex: 0 0 100px; overflow: auto">
      <div v-for="item in data" :key="item.path">{{ item.name }}</div>
    </div>
    <n-split
      style="flex: 1"
      direction="vertical"
      pane1-class="rule-table"
      pane2-class="list-table"
      :resize-trigger-size="4"
      disabled
    >
      <template #1>
        <RuleListTable style="height: 100%"></RuleListTable>
      </template>
      <template #2>
        <FileListTable v-model:data="data" style="height: 100%"></FileListTable>
      </template>
    </n-split>
  </n-flex>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { RowData as ListRowData } from '../interface/ListDataTable'
import { h, ref, reactive, onMounted, defineModel, watch, isReactive, isRef } from 'vue'

// import ListTable from "../components/ListTable.vue";
// import RuleListTable from "../components/RuleListTable.vue";
const FileListTable = defineAsyncComponent(() => import('../components/ListTable-backup.vue'))
const RuleListTable = defineAsyncComponent(() => import('../components/RuleListTable.vue'))

// const data = ref<ListRowData[]>(
//   Array.from({ length: 10 }).map((_, index) => ({
//     key: index.toString(),
//     path: `${index}`,
//     name: `Edward King ${index}`,
//     newName: `${index * 32}`,
//     state: index % 2 == 1 ? "ok" : "conflict",
//   }))
// );
const data = ref<ListRowData[]>([])
</script>

<style lang="scss" scoped>
:deep(*) {
  box-sizing: border-box;
}

.main {
  padding: 5px;
  overflow: hidden;
  height: 100%;

  :deep(.rule-table) {
    flex: 1;
    // overflow: hidden;
    // padding-top: 2px;
  }
  :deep(.list-table) {
    // position: relative;
    flex: 1 40%;
    // padding-top: 2px;
    // background-color: wheat;
    // border: wheat 1px solid;
    // padding: 10px;
    // margin: 10px;
  }
}
</style>
