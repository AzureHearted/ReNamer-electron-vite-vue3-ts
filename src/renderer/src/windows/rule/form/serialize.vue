<template>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="54"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
  >
    <n-divider title-placement="left" style="font-size: 14px; margin: -4px 0 4px 0">
      位置
    </n-divider>
    <n-form-item path="position">
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
              placeholder="位置"
              :min="0"
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
    <n-form-item>
      <n-space vertical :size="2">
        <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
      </n-space>
    </n-form-item>
    <n-divider title-placement="left" style="font-size: 14px; margin: 2px 0 4px 0">
      序列
    </n-divider>
    <n-space :size="20">
      <n-space vertical :size="2" align="center">
        <n-form-item label="起始:" path="sequenceStart">
          <n-input-number v-model:value="data.sequenceStart" placeholder="起始" />
        </n-form-item>
        <n-form-item label="步长:" path="sequenceStep">
          <n-input-number v-model:value="data.sequenceStep" placeholder="步长" />
        </n-form-item>
        <n-form-item label="补零:" path="paddingCount">
          <n-input-number
            v-model:value="data.paddingCount"
            placeholder="补零长度 (-1:自动填充 0：不进行补零 >0:填充指定数量的0)"
            :min="-1"
          />
        </n-form-item>
      </n-space>
      <n-form-item path="resetFolderChanges">
        <n-checkbox v-model:checked="data.resetFolderChanges" label="文件夹变更时重置" />
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ReNameSerializeRule } from '@common/class/ReNameRule'
import { Text as IconText } from '@vicons/ionicons5'
import { TextBaseline20Filled as IconExactMatch } from '@vicons/fluent'
import SwitchButton from '@renderer/components/button/switch-button.vue'

//s 表单数据定义
const data = defineModel<ReNameSerializeRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameSerializeRule())
  }
})
</script>

<style scoped lang="scss">
.form-item {
  padding-bottom: 4px;
}
</style>
