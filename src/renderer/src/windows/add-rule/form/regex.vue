<template>
  <n-form
    :model="data"
    label-placement="left"
    label-align="left"
    :label-width="68"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-space vertical :size="4">
      <n-form-item label="表达式:" path="match">
        <n-input-group>
          <n-input v-model:value="data.regex" placeholder="正则表达式" clearable />
          <SwitchButton v-model:value="data.ignoreCase">
            <IconText />
          </SwitchButton>
          <SwitchButton v-model:value="data.isExactMatch">
            <IconExactMatch />
          </SwitchButton>
        </n-input-group>
      </n-form-item>
      <n-form-item label="替换:" path="replaceTo">
        <n-mention
          v-model:value="data.replaceTo"
          :options="optionsMetaInfo"
          :prefix="[':']"
          placeholder="输入要插入的内容(输入:可以插入元信息)"
          :render-label="renderLabel"
          :filter="filter"
        ></n-mention>
      </n-form-item>
      <n-form-item label=" " path="ignoreExt">
        <n-space vertical :size="2">
          <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
        </n-space>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ReNameRegexRule } from '@common/class/ReNamerRule'
import { useMetaMention, optionsMetaInfo } from './common'
import { Text as IconText } from '@vicons/ionicons5'
import { TextBaseline20Filled as IconExactMatch } from '@vicons/fluent'
import SwitchButton from '@renderer/components/button/switch-button.vue'

// 使用MetaMotion
const { renderLabel, filter } = useMetaMention()

//s 表单数据定义
const data = defineModel<ReNameRegexRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameRegexRule())
  }
})
</script>

<style scoped lang="scss"></style>
