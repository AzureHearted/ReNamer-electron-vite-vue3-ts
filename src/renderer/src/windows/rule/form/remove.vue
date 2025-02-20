<template>
  <n-form
    :model="data"
    label-placement="left"
    :label-width="54"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
  >
    <n-form-item class="form-item" label="移除:" path="match">
      <n-input-group>
        <n-input v-model:value="data.match" placeholder="输入要移除的内容" clearable />
        <SwitchButton v-model:value="data.ignoreCase" reverse-style>
          <IconText />
        </SwitchButton>
        <SwitchButton v-model:value="data.isExactMatch">
          <IconExactMatch />
        </SwitchButton>
      </n-input-group>
    </n-form-item>
    <n-form-item label="范围:" path="range">
      <n-space vertical :size="2" style="padding: 4px 0 2px 0">
        <n-radio-group v-model:value="data.range">
          <n-space vertical :size="2">
            <n-radio value="all"> 全部 </n-radio>
            <n-radio value="first"> 首个 </n-radio>
            <n-radio value="last"> 末个 </n-radio>
            <!-- <n-space align="center">
              <n-radio value="after"> 到文本后 </n-radio>
              <n-input-group v-if="data.range === 'after'">
                <n-input
                  v-model:value="data.anchorText"
                  size="small"
                  placeholder="输入要锚点内容"
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
              <n-input-group v-if="data.range === 'before'">
                <n-input
                  v-model:value="data.anchorText"
                  size="small"
                  placeholder="输入要锚点内容"
                  clearable
                />
                <SwitchButton v-model:value="data.ignoreCase" reverse-style>
                  <IconText />
                </SwitchButton>
                <SwitchButton v-model:value="data.isExactMatch">
                  <IconExactMatch />
                </SwitchButton>
              </n-input-group>
            </n-space> -->

            <!-- <n-radio value="ltr"> 从左到右 </n-radio> -->
            <!-- <n-radio value="rtl"> 从右到左 </n-radio> -->
          </n-space>
        </n-radio-group>
      </n-space>
    </n-form-item>
    <n-form-item label=" " path="ignoreExt">
      <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import { optionsMetaInfo, useMetaMention } from './common' //s 导入公共变量
import { ReNameRemoveRule } from '@common/class/ReNameRule'
import { Text as IconText } from '@vicons/ionicons5'
import { TextBaseline20Filled as IconExactMatch } from '@vicons/fluent'
import SwitchButton from '@renderer/components/button/switch-button.vue'

// 使用MetaMotion
// const { renderLabel, filter } = useMetaMention()

//s 表单数据定义
const data = defineModel<ReNameRemoveRule>('data', {
  default: () => {
    // 默认值
    return reactive(new ReNameRemoveRule())
  }
})
</script>

<style scoped lang="scss"></style>
