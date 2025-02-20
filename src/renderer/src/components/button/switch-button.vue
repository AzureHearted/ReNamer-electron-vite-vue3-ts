<template>
  <n-button :size="size" :type="type" @click="model = !model" :focusable="false">
    <n-icon>
      <slot></slot>
    </n-icon>
  </n-button>
</template>

<script setup lang="ts">
import { ButtonProps } from 'naive-ui'
import { computed } from 'vue'

const model = defineModel('value', {
  default: false
})

interface Props {
  /** 尺寸 */
  size?: ButtonProps['size']
  /** 选中时候的样式 */
  typeChecked?: ButtonProps['type']
  /** 为选中时候的样式 */
  typeUnchecked?: ButtonProps['type']
  /** 反转样式 */
  reverseStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  typeChecked: 'info',
  typeUnchecked: 'default',
  reverseStyle: false
})

//j 类型
const type = computed<ButtonProps['type']>(() => {
  const { typeChecked, typeUnchecked, reverseStyle } = props
  if (!reverseStyle) {
    return model.value ? typeChecked : typeUnchecked
  } else {
    return model.value ? typeUnchecked : typeChecked
  }
})
</script>

<style lang="scss" scoped></style>
