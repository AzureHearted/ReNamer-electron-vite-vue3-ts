<template>
  <Frame :title="title">
    <template #="{ isDark }">
      <n-config-provider :theme="isDark ? darkTheme : null" abstract>
        <View
          v-if="ready"
          :default-rule="defaultRule"
          :id="ruleId"
          v-model:mode="mode"
          v-model:rule-type="ruleType"
          @update:rule="onRuleChange"
        />
      </n-config-provider>
    </template>
  </Frame>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  Ref,
  ref,
  watch
} from 'vue'
import { darkTheme } from 'naive-ui'
import Frame from '@renderer/components/frame/index.vue'
import View from './index.vue'
import { generateRuleByObj } from '@common/class/ReNameRule/utils/generateRuleByObj'
import { TReNameRule } from '@common/class/ReNameRule'
import { useRoute, useRouter } from 'vue-router'
import { buildUUID } from '@common/utils/common'
const { ipcRenderer } = window.electron

const route = useRoute()
const router = useRouter()

const mode = ref<'add' | 'edit'>('add')

const defaultRule = ref<TReNameRule>()

const ruleId = ref<string>()

const ruleData = ref<TReNameRule>()

// const title = ref('添加规则')
const title = computed(() => {
  let t = ''
  if (mode.value === 'add') {
    t += '添加规则'
  } else if (mode.value === 'edit') {
    t += `编辑规则`
    if (defaultRule.value?.type !== ruleData.value?.type) {
      if (ruleData.value && defaultRule.value) {
        t += `（${defaultRule.value.name} → ${ruleData.value.name}）`
      }
    } else {
      if (defaultRule.value) {
        t += `（${defaultRule.value.name}）`
      }
    }
  }
  return t
})

//j 当前类型
const ruleType = computed<TReNameRule['type']>(() => {
  // 提取路径中的规则类型
  const match = /(?<=\/rule\/).+/.exec(route.path)
  if (match && match[0]) {
    // console.log(match[0])
    return match[0] as TReNameRule['type']
  } else {
    return 'insert'
  }
})

watch(
  () => ruleType.value,
  (type) => {
    // 窗口规则变化事件 (将当前规则发送给主进程)
    ipcRenderer.send('rule-window-type-update', type)
  }
)

//s 准备状态
const ready = ref<boolean>(false)

onBeforeMount(async () => {
  // 通知主进程(通过ipc通讯获取当前模式)
  // const payload = await ipcRenderer.invoke('rule-window-ready')
  const { mode: _mode, ruleData } = await window.api.rule.ready()

  mode.value = _mode
  if (_mode === 'add') {
    // console.log('添加规则模式')
    ruleId.value = buildUUID()
  }
  if (_mode === 'edit') {
    // console.log('编辑规则模式')
    const rule = generateRuleByObj(ruleData)
    if (!rule) throw new Error('规则解析错误')
    // ruleMap[rule.type] = rule
    defaultRule.value = rule
    ruleId.value = rule.id
  }
  ready.value = true
  // console.log('通知主进程(通过ipc通讯获取当前模式)', payload)
})

// 监听View组件的Rule变化事件
function onRuleChange(value: TReNameRule) {
  ruleData.value = value
}
</script>
<style scoped lang="scss"></style>
