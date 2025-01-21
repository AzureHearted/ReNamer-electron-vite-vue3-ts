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
              :class="{ 'is-click': route.path === '/add-rule/delete' }"
              @click="changeType('delete')"
            >
              删除
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
        <RouterView v-slot="{ Component, route }">
          <component ref="ruleEditRef" :is="Component" v-model:data="data" :key="route.fullPath" />
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
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Add12Filled as IconAdd } from '@vicons/fluent'
import { type TReNameRule, ReNameInsertRule } from '@common/class/ReNamerRule'

const route = useRoute()
const router = useRouter()

//s 默认初始规则
const defaultData: TReNameRule = new ReNameInsertRule()

//s 响应式规则
const data = reactive<TReNameRule>(defaultData)

const ruleEditRef = ref()

onMounted(() => {
  // console.log(ruleEditRef.value)
})

watch(
  () => data,
  (data) => {
    console.log(data)
  },
  { deep: true }
)

//f 类型改变
function changeType(type: string) {
  router.push(`/add-rule/${type}`)
}

//f 关闭窗口
function handleClose() {
  const { ipcRenderer } = window.electron
  ipcRenderer.send('window-close')
}

//f 执行添加规则
function handleAddRule() {
  const { ipcRenderer } = window.electron
  ipcRenderer.send('handle-addRule', JSON.stringify(data))
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
