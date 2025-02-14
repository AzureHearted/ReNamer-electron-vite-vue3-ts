<template>
  <n-flex class="add-rule" vertical :size="0">
    <n-flex class="main" :size="10">
      <!-- s 左侧规则类型列表 -->
      <n-card class="left" size="small" content-class="content-no-padding left-content">
        <n-scrollbar>
          <n-list hoverable clickable bordered>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/insert' }"
              @click="changeType('insert')"
            >
              插入
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/replace' }"
              @click="changeType('replace')"
            >
              替换
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/remove' }"
              @click="changeType('remove')"
            >
              移除
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/serialize' }"
              @click="changeType('serialize')"
            >
              序列化
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/fill' }"
              @click="changeType('fill')"
            >
              填充
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/regex' }"
              @click="changeType('regex')"
            >
              正则
            </n-list-item>
            <n-list-item
              :class="{ 'is-click': route.path === '/add-rule/extension' }"
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
          <component
            ref="ruleEditRef"
            :is="Component"
            v-model:data="ruleMap[ruleType]"
            :key="route.fullPath"
          />
        </RouterView>
      </n-card>
    </n-flex>
    <!-- s 底部按钮 -->
    <div class="bottom">
      <n-card :bordered="false" size="small" content-class="content-no-padding right-content">
        <div style="display: flex; width: 100%; gap: 20px" align="stretch">
          <n-button style="flex: 1" size="medium" @click="handleAddRule">
            <template #icon>
              <n-icon>
                <IconAdd />
              </n-icon>
            </template>
            添加规则
          </n-button>
          <n-button style="width: 160px" size="medium" @click="handleClose">关闭</n-button>
        </div>
      </n-card>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Add12Filled as IconAdd } from '@vicons/fluent'
import {
  type TReNameRule,
  ReNameInsertRule,
  ReNameReplaceRule,
  ReNameRemoveRule,
  ReNameSerializeRule,
  ReNameFillRule,
  ReNameRegexRule,
  ReNameExtensionRule
} from '@common/class/ReNamerRule'

const route = useRoute()
const router = useRouter()

interface IRuleMap {
  insert: ReNameInsertRule
  replace: ReNameReplaceRule
  remove: ReNameRemoveRule
  serialize: ReNameSerializeRule
  fill: ReNameFillRule
  regex: ReNameRegexRule
  extension: ReNameExtensionRule
}

//s 类型对象图
const ruleMap = reactive<IRuleMap>({
  insert: new ReNameInsertRule(),
  replace: new ReNameReplaceRule(),
  remove: new ReNameRemoveRule(),
  serialize: new ReNameSerializeRule(),
  fill: new ReNameFillRule(),
  regex: new ReNameRegexRule(),
  extension: new ReNameExtensionRule()
})

onMounted(() => {
  // const match = /(?<=\/add-rule\/).+/.exec(route.path)
  // console.log(match && match[0])
})

//s 当前类型
const ruleType = computed<TReNameRule['type']>(() => {
  // 提取路径中的规则类型
  const match = /(?<=\/add-rule\/).+/.exec(route.path)
  if (match && match[0]) {
    // console.log(match[0])
    return match[0] as TReNameRule['type']
  } else {
    return 'insert'
  }
})

//f 类型改变
function changeType(type: TReNameRule['type']) {
  router.push(`/add-rule/${type}`)
}

// watch(
//   [() => ruleMap, () => ruleType.value],
//   ([map, type]) => {
//     console.log('规则对象变化', JSON.parse(JSON.stringify(map[type])))
//   },
//   { deep: true }
// )

//j 动态规则
const rule = computed(() => {
  if (!(ruleType.value && ruleMap)) return null
  return ruleMap[ruleType.value]
})

watch(
  () => rule,
  (data) => {
    console.log('规则对象变化', JSON.parse(JSON.stringify(data.value)))
  },
  { deep: true }
)

//f 关闭窗口
function handleClose() {
  const { ipcRenderer } = window.electron
  ipcRenderer.send('window-close')
}

//f 执行添加规则
function handleAddRule() {
  const { ipcRenderer } = window.electron
  ipcRenderer.send('handle-addRule', JSON.stringify(rule.value))
}
</script>

<style lang="scss" scoped>
@use 'src/renderer/src/styles/base.scss' as vars;

:deep(.content-no-padding) {
  padding: 0 !important;
}

.add-rule {
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
