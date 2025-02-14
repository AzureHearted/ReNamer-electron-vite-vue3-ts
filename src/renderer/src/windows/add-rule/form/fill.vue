<template>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="54"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="" path="position">
      <n-radio-group v-model:value="data.method" style="padding: 4px 0 2px 0">
        <n-space vertical :size="2">
          <n-space :size="2" align="center">
            <n-radio value="zeroPadding"> 补零填充 </n-radio>
            <n-input-group v-if="data.method === 'zeroPadding'">
              <n-input-group-label size="small">长度</n-input-group-label>
              <n-input-number
                v-model:value="data.length"
                size="small"
                placeholder="填充长度"
                :min="1"
              />
            </n-input-group>
          </n-space>
          <n-space :size="2" align="center">
            <n-radio value="textPadding"> 文本填充 </n-radio>
            <n-input-group v-if="data.method === 'textPadding'">
              <n-mention
                v-model:value="data.character"
                :options="optionsMetaInfo"
                :prefix="[':']"
                size="small"
                placeholder="输入要插入的内容(输入:可以插入元信息)"
                :render-label="renderLabel"
                :filter="filter"
              ></n-mention>
            </n-input-group>
          </n-space>
          <n-radio value="removeZeroPadding"> 移除补零 </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item>
      <n-space vertical :size="2">
        <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ReNameFillRule } from '@common/class/ReNamerRule'
import { useMetaMention, optionsMetaInfo } from './common'

// 使用MetaMotion
const { renderLabel, filter } = useMetaMention()

//s 表单数据定义
const data = defineModel<ReNameFillRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameFillRule())
  }
})
</script>

<style scoped lang="scss"></style>
