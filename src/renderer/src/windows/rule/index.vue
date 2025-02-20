<template>
  <n-flex class="rule" vertical :size="0">
    <n-flex class="main" :size="10">
      <!-- s 左侧规则类型列表 -->
      <n-card class="left" size="small" content-class="content-no-padding left-content">
        <n-scrollbar>
          <n-list hoverable clickable bordere>
            <n-list-item
              :class="{ 'is-click': ruleType === 'insert' }"
              @click="changeType('insert')"
            >
              插入
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': ruleType === 'replace' }"
              @click="changeType('replace')"
            >
              替换
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': ruleType === 'remove' }"
              @click="changeType('remove')"
            >
              移除
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': ruleType === 'serialize' }"
              @click="changeType('serialize')"
            >
              序列化
            </n-list-item>
            <n-list-item :class="{ 'is-click': ruleType === 'fill' }" @click="changeType('fill')">
              填充
            </n-list-item>
            <n-list-item :class="{ 'is-click': ruleType === 'regex' }" @click="changeType('regex')">
              正则
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': ruleType === 'extension' }"
              @click="changeType('extension')"
            >
              扩展名
            </n-list-item>
          </n-list>
        </n-scrollbar>
      </n-card>
      <!-- s 左侧规则配置窗口 -->
      <n-card class="right" size="small">
        <!-- 同一种自定义组件动态路由不同的规则设置界面 -->
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" v-model:data="ruleMap[ruleType]" :key="route.fullPath" />
        </RouterView>
      </n-card>
    </n-flex>
    <!-- s 底部按钮 -->
    <div class="bottom">
      <n-card :bordered="false" size="small" content-class="content-no-padding right-content">
        <div style="display: flex; width: 100%; gap: 20px" align="stretch">
          <n-button v-if="mode === 'add'" style="flex: 1" size="medium" @click="handleAddRule">
            <template #icon>
              <n-icon color="#63E2B7">
                <IconAdd />
              </n-icon>
            </template>
            添加规则
          </n-button>
          <n-button v-if="mode === 'edit'" style="flex: 1" size="medium" @click="handleUpdateRule">
            <template #icon>
              <n-icon color="#63E2B7">
                <IconSave />
              </n-icon>
            </template>
            更新规则
          </n-button>
          <n-button style="width: 160px" size="medium" @click="handleClose">
            <template #icon>
              <n-icon color="red">
                <IconDismiss />
              </n-icon>
            </template>
            关闭</n-button
          >
        </div>
      </n-card>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import {
  computed,
  handleError,
  nextTick,
  onDeactivated,
  onUnmounted,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Add12Filled as IconAdd,
  Save20Filled as IconSave,
  Dismiss12Filled as IconDismiss
} from '@vicons/fluent'
import {
  type TReNameRule,
  ReNameInsertRule,
  ReNameReplaceRule,
  ReNameRemoveRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
} from '@common/class/ReNameRule'
import { buildUUID } from '@common/utils/common'
import { log } from '@renderer/utils/log'

const emits = defineEmits<{
  (e: 'update:rule', rule: TReNameRule): void
}>()

const { ipcRenderer } = window.electron
const route = useRoute()
const router = useRouter()

//s 模式
const mode = defineModel<'add' | 'edit'>('mode', { default: 'add' })
//s 规则类型
const ruleType = defineModel<TReNameRule['type']>('ruleType', { default: 'insert' })

//s 初始规则
const props = withDefaults(
  defineProps<{
    defaultRule?: TReNameRule //s 初始规则
    id?: string //s ID
  }>(),
  {
    id: () => buildUUID()
  }
)

// 定义 RuleMap 类型
type RuleMap = { [key in TReNameRule['type']]: TReNameRule }

//s 类型对象图
const ruleMap = reactive<RuleMap>({
  insert: new ReNameInsertRule(),
  replace: new ReNameReplaceRule(),
  remove: new ReNameRemoveRule(),
  serialize: new ReNameSerializeRule(),
  fill: new ReNameFillRule(),
  regex: new ReNameRegexRule(),
  extension: new ReNameExtensionRule()
})

onMounted(() => {
  const defaultRule = props.defaultRule
  // 设置默认规则
  if (defaultRule) {
    // 如果有默认规则则使用默认规则的类型
    ruleMap[defaultRule.type] = defaultRule
    // router.push({ name: `rule-${defaultRule.type}` })
    changeType(defaultRule.type)
  } else {
    // 如果没有传入默认规则则使用父组件传入的规则类型
    changeType(ruleType.value)
  }
  // 同步id
  syncId()
})

//f 同步id
function syncId() {
  ruleMap.insert.id = props.id
  ruleMap.replace.id = props.id
  ruleMap.remove.id = props.id
  ruleMap.serialize.id = props.id
  ruleMap.fill.id = props.id
  ruleMap.regex.id = props.id
  ruleMap.extension.id = props.id
}

//f 通过路由改变规则类型
function changeType(type: TReNameRule['type']) {
  router.push({ name: `rule-${type}` })
}

//j 动态规则
const rule = computed(() => {
  if (!(ruleType.value && ruleMap)) return null
  // 规则发生变化时触发更新
  emits('update:rule', ruleMap[ruleType.value] as TReNameRule)
  return ruleMap[ruleType.value]
})

watch(
  () => rule,
  (data) => {
    console.log('规则对象变化：', data.value)
  },
  { deep: true }
)

//f 关闭窗口
function handleClose() {
  ipcRenderer.send('window-close')
}

//f 执行添加规则
function handleAddRule() {
  const ruleJson = JSON.stringify(rule.value)
  console.log('添加规则', JSON.parse(ruleJson))
  ipcRenderer.send('handle-addRule', ruleJson)
  handleClose()
}
//f 执行更新规则
function handleUpdateRule() {
  const ruleJson = JSON.stringify(rule.value)
  console.log('保存规则', JSON.parse(ruleJson))
  ipcRenderer.send('handle-updateRule', ruleJson)
  handleClose()
}
</script>

<style lang="scss" scoped>
@use 'src/renderer/src/styles/base.scss' as vars;

:deep(.content-no-padding) {
  padding: 0 !important;
}

.rule {
  // box-sizing: border-box;
  height: 100%;
  // padding: 11.5px 16.5px;
  .main {
    overflow: hidden;

    flex: 1;
    width: 100%;
    // padding: 11.5px 16.5px;
    padding: 14px 16px 4px;

    // border: 1px solid white;
    & > div {
      height: 100%;
      // background-color: blueviolet;
    }

    .left {
      flex: 0 0 102px;
      border-radius: 3px;
      user-select: none;

      :deep(.n-list-item) {
        padding: 2px 6px;
      }

      :deep(.left-content, .right-content) {
        height: 100%;
      }

      .is-click {
        // background: rgb(0, 89, 255);
        background: vars.$selected-area;
        color: vars.$selected-area-text;
      }
    }
    .right {
      flex: 1;
      border-radius: 3px;
      overflow: auto;
      :deep(.n-card__content) {
        padding: 12px 12px;
      }
    }
  }

  .bottom {
    flex: 0 0 54px;
    padding: 6px 16px 14px;
    // border: 1px solid white;
    & > div {
      height: 100%;
      // background-color: orange;
      border-radius: 3px;
    }
  }
}
</style>
