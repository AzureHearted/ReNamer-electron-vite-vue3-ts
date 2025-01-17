<template>
  <n-config-provider :theme="isDark ? darkTheme : null" abstract>
    <div class="frame">
      <TitleBar :is-dark="isDark" />
      <div class="view">
        <RouterView />
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { usePreferredDark } from '@vueuse/core'
import { VxeUI } from 'vxe-table'
import { reactive, ref, watch } from 'vue'
import { onMounted } from 'vue'
import TitleBar from '@renderer/views/layout/title-bar.vue'

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
.frame {
  position: fixed;
  display: flex;
  flex-flow: column nowrap;

  width: 100%;
  height: 100%;

  .view {
    flex: 1;
    overflow: hidden;
  }
}
</style>
