<template>
  <n-button
    :size="size"
    :type="value ? 'info' : 'default'"
    @click="value = !value"
    :focusable="false"
  >
    <n-icon>
      <slot></slot>
    </n-icon>
  </n-button>
</template>

<script setup lang="ts">
import { ButtonProps } from 'naive-ui'

const value = defineModel('value', {
  default: false
})

withDefaults(
  defineProps<{
    size?: ButtonProps['size']
  }>(),
  {
    size: 'small'
  }
)
</script>

<style lang="scss" scoped></style>
