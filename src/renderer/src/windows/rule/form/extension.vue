<template>
  <n-form
    :model="data"
    label-placement="left"
    label-align="left"
    :label-width="68"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
  >
    <n-space vertical :size="4">
      <n-form-item label="新扩展名(无需.)" label-placement="top" path="newExt">
        <n-select
          v-model:value="data.newExt"
          filterable
          tag
          placeholder="填入扩展名(无需.)"
          :options="optionsExtInfo"
        />
      </n-form-item>
      <n-form-item label="" path="ignoreExt">
        <n-space vertical :size="2">
          <n-checkbox v-model:checked="data.ignoreExt">
            忽略扩展名 (勾选后不会替换扩展名)
          </n-checkbox>
        </n-space>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ReNameExtensionRule } from '@common/class/ReNameRule'
import { optionsExtInfo } from './common/hook'

//s 表单数据定义
const data = defineModel<ReNameExtensionRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameExtensionRule())
  }
})
</script>

<style scoped lang="scss"></style>
