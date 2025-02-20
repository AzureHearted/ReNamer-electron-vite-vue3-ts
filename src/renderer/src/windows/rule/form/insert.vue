<template>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="54"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
  >
    <n-form-item label="插入:" path="text">
      <n-input-group>
        <n-mention
          v-model:value="data.text"
          :options="optionsMetaInfo"
          :prefix="[':']"
          placeholder="输入要插入的内容(输入:可以插入元信息)"
          :render-label="renderLabel"
          :filter="filter"
        ></n-mention>
      </n-input-group>
    </n-form-item>
    <n-form-item label="位置:" path="position">
      <n-radio-group v-model:value="data.position" style="padding: 4px 0 2px 0">
        <n-space vertical :size="2">
          <n-radio value="prefix"> 前缀 </n-radio>
          <n-radio value="suffix"> 后缀 </n-radio>
          <n-space align="center">
            <n-radio value="index"> 位置 </n-radio>
            <n-input-number
              v-if="data.position === 'index'"
              v-model:value="data.anchorIndex"
              size="small"
              placeholder="索引"
              :min="1"
            />
          </n-space>
          <n-space align="center">
            <n-radio value="after"> 到文本后 </n-radio>
            <n-input-group v-if="data.position === 'after'">
              <n-input
                v-model:value="data.anchorText"
                size="small"
                placeholder="输入要匹配的内容"
                clearable
              />
              <SwitchButton v-model:value="data.ignoreCase" reverse-style>
                <IconText />
              </SwitchButton>
              <SwitchButton v-model:value="data.isExactMatch">
                <IconExactMatch />
              </SwitchButton>
            </n-input-group>
          </n-space>
          <n-space align="center">
            <n-radio value="before"> 到文本前 </n-radio>
            <n-input-group v-if="data.position === 'before'">
              <n-input
                v-model:value="data.anchorText"
                size="small"
                placeholder="输入要匹配的内容"
                clearable
              />
              <SwitchButton v-model:value="data.ignoreCase" reverse-style>
                <IconText />
              </SwitchButton>
              <SwitchButton v-model:value="data.isExactMatch">
                <IconExactMatch />
              </SwitchButton>
            </n-input-group>
          </n-space>
          <n-radio value="replace"> 替换当前名称 </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <!-- 复选框 -->
    <n-form-item label=" ">
      <n-space>
        <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { optionsMetaInfo, useMetaMention } from './common/hook' //s 导入公共变量
import { ReNameInsertRule } from '@common/class/ReNameRule'
import { Text as IconText } from '@vicons/ionicons5'
import { TextBaseline20Filled as IconExactMatch } from '@vicons/fluent'
import SwitchButton from '@renderer/components/button/switch-button.vue'

// 使用MetaMotion
const { renderLabel, filter } = useMetaMention()
//s 表单数据定义
const data = defineModel<ReNameInsertRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameInsertRule())
  }
})
</script>

<style scoped lang="scss"></style>
