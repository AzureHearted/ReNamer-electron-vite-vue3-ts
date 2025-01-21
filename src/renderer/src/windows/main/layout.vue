<template>
  <Frame title="超级重命名">
    <template #default="{ isDark }">
      <n-config-provider :theme="isDark ? darkTheme : null" abstract>
        <View />
      </n-config-provider>
    </template>
  </Frame>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import Frame from '@renderer/components/frame/index.vue'
import View from './index.vue'
</script>
<style scoped lang="scss"></style>
