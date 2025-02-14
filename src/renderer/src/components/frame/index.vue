<template>
  <div class="frame frame-scrollbar">
    <slot name="title-bar" :isDark="isDark">
      <TitleBar :title="title" :is-dark="isDark" />
    </slot>
    <div class="view">
      <slot name="default" :is-dark="isDark"> </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { VxeUI } from 'vxe-table'
import { reactive, ref, watch } from 'vue'
import { onMounted } from 'vue'
import TitleBar from '@renderer/components/frame/title-bar.vue'

withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '新窗口'
  }
)

const isDark = usePreferredDark()

onMounted(() => {
  changeTheme(isDark.value)
  watch(isDark, (value) => {
    changeTheme(value)
  })
})

function changeTheme(isDarkMode: boolean) {
  if (isDarkMode) {
    // 切换为暗黑主题
    VxeUI.setTheme('dark')
  } else {
    // 切换为默认主题
    VxeUI.setTheme('light')
  }
}
</script>

<style scoped lang="scss">
@use 'src/renderer/src/styles/base.scss' as vars;

//s 框架
.frame {
  position: fixed;
  display: flex;
  flex-flow: column nowrap;

  width: 100%;
  height: 100%;
  background-color: vars.$background;

  .view {
    flex: 1;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
@use 'src/renderer/src/styles/base.scss' as vars;

//s 框架的自定义滚动条样式
.frame-scrollbar {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
}

/** 默认模式 */
[data-vxe-ui-theme='light'] {
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    // background-color: #bfbfbf;
    background-color: rgba(191, 191, 191, 0.5);
  }
  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    background-color: #787878;
  }
}

/** 暗黑模式 */
[data-vxe-ui-theme='dark'] {
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background-color: vars.$background;
  }
  ::-webkit-scrollbar-thumb {
    // background-color: #bfbfbf;
    background-color: rgba(191, 191, 191, 0.5);
  }
  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    background-color: #a3a6ad;
  }
}
</style>
