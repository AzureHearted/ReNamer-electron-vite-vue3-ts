<template>
  <n-form
    ref="formRef"
    :model="data"
    label-placement="left"
    :label-width="65"
    require-mark-placement="right-hanging"
    size="small"
    :show-feedback="false"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="插入：" path="text" :feedback="data.text">
      <n-mention
        v-model:value="data.text"
        :options="optionsMetaInfo"
        :prefix="[':']"
        placeholder="输入要插入的内容(输入:可以插入元信息)"
        :render-label="renderLabel"
        :filter="filter"
      ></n-mention>
    </n-form-item>
    <n-form-item label="位置：" path="position" :feedback="data.position">
      <n-radio-group v-model:value="data.position" style="padding: 5px 0 2px 0">
        <n-space vertical :size="2">
          <n-radio value="prefix"> 前缀 </n-radio>
          <n-radio value="suffix"> 后缀 </n-radio>
          <n-radio value="index"> 位置 </n-radio>
          <n-radio value="after_the_text"> 到文本后 </n-radio>
          <n-radio value="before_the_text"> 到文本前 </n-radio>
          <n-radio value="replace"> 替换当前名称 </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item v-if="data.position === 'index'" label="索引：" path="index">
      <n-input-number v-model:value="data.anchorIndex" />
    </n-form-item>
    <n-form-item
      v-if="data.position === 'after_the_text' || data.position === 'before_the_text'"
      label="匹配："
      path="match"
    >
      <n-input v-model:value="data.anchorText" placeholder="输入要匹配的内容" />
    </n-form-item>
    <n-form-item label=" ">
      <n-space>
        <n-checkbox v-model:checked="data.ignoreExt"> 忽略扩展名 </n-checkbox>
        <n-checkbox
          v-if="data.position === 'after_the_text' || data.position === 'before_the_text'"
          v-model:checked="data.ignoreCase"
        >
          忽略大小写
        </n-checkbox>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue'
import type { VNodeChild } from 'vue'
import { NIcon } from 'naive-ui'
import type { MentionOption } from 'naive-ui'
import { ExtensionPuzzleOutline as IconPuzzle } from '@vicons/ionicons5'
import { optionsMetaInfo } from './common' //s 导入公共变量
import { fuzzyPinyinFilter } from '@utils/common' //s 导入公共方法
import type { TReNameInsertRule } from '@common/interface/ReNamerRule'
import { ReNameInsertRule } from '@common/class/ReNamerRule'

//s 表单数据定义
const data = defineModel<TReNameInsertRule>('data', {
  default: () => {
    return reactive(new ReNameInsertRule())
  }
})

//f 自定义渲染函数
function renderLabel(option: MentionOption): VNodeChild {
  return h('div', { style: 'display: flex; align-items: center;' }, [
    h(
      NIcon,
      {
        style: 'margin-right: 8px;'
      },
      { default: () => h(IconPuzzle) }
    ),
    `${option.label}`
  ])
}

//f 自定义过滤器
function filter(pattern: string, option: MentionOption): boolean {
  return (
    fuzzyPinyinFilter(pattern, `${option.label}`) || fuzzyPinyinFilter(pattern, `${option.value}`)
  )
}
</script>

<style scoped lang="scss"></style>
