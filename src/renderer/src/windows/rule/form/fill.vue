<template>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="54"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
  >
    <n-form-item label="" path="position">
      <n-space vertical :size="2">
        <n-space vertical :size="2">
          <n-space :size="2" align="center">
            <n-checkbox v-model:checked="data.zeroPadding.enable" label="补零填充" />
            <n-input-group>
              <n-input-group-label size="small">长度</n-input-group-label>
              <n-input-number
                v-model:value="data.zeroPadding.length"
                :disabled="!data.zeroPadding.enable"
                size="small"
                placeholder="填充长度"
                :min="1"
              />
            </n-input-group>
          </n-space>
          <n-checkbox v-model:checked="data.removeZeroPadding" label="移除补零" />
        </n-space>
        <n-divider></n-divider>
        <n-space :size="2">
          <n-checkbox v-model:checked="data.textPadding.enable"> 文本填充 </n-checkbox>
          <n-space :size="2" vertical style="margin-top: -2px">
            <n-input-group>
              <n-input-group-label size="small">内容</n-input-group-label>
              <n-mention
                v-model:value="data.textPadding.character"
                :options="optionsMetaInfo"
                :prefix="[':']"
                size="small"
                placeholder="输入要插入的内容(输入:可以插入元信息)"
                :render-label="renderLabel"
                :filter="filter"
                :disabled="!data.textPadding.enable"
              ></n-mention>
            </n-input-group>
            <n-input-group>
              <n-input-group-label size="small">长度</n-input-group-label>
              <n-input-number
                v-model:value="data.textPadding.length"
                size="small"
                placeholder="填充长度"
                :min="1"
                :disabled="!data.textPadding.enable"
              />
            </n-input-group>
            <n-space>
              <n-form-item label="填充方向" path="textPadding.direction" label-width="auto">
                <n-radio-group
                  v-model:value="data.textPadding.direction"
                  size="small"
                  name="direction"
                  :disabled="!data.textPadding.enable"
                >
                  <n-radio value="left"> 左 </n-radio>
                  <n-radio value="right"> 右 </n-radio>
                </n-radio-group>
              </n-form-item>
            </n-space>
          </n-space>
        </n-space>
      </n-space>
    </n-form-item>
    <n-form-item>
      <n-space vertical :size="2">
        <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ReNameFillRule } from '@common/class/ReNameRule'
import type { CheckboxGroupProps } from 'naive-ui'
import { useMetaMention, optionsMetaInfo } from './common/hook'

// 使用MetaMotion
const { renderLabel, filter } = useMetaMention()

//s 表单数据定义
const data = defineModel<ReNameFillRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameFillRule())
  }
})

watch(
  [() => data.value.zeroPadding.enable, () => data.value.removeZeroPadding],
  ([zeroPadding, removeZeroPadding], [oldZeroPadding, oldRemoveZeroPadding]) => {
    console.log(
      '更新',
      `新：${zeroPadding},${removeZeroPadding}`,
      `旧：${oldZeroPadding},${oldRemoveZeroPadding}`
    )

    if (zeroPadding !== oldZeroPadding && zeroPadding) {
      data.value.removeZeroPadding = !data.value.zeroPadding.enable
    }
    if (removeZeroPadding !== oldRemoveZeroPadding && removeZeroPadding) {
      data.value.zeroPadding.enable = !data.value.removeZeroPadding
    }
  }
)
</script>

<style scoped lang="scss"></style>
