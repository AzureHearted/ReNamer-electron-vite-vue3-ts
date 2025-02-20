<template>
  <div class="title-bar" :is-dark="isDark">
    <div class="title">{{ title }}</div>
    <button class="item" @click="onChangeWindow('min')" tabindex="-1">
      <svg
        t="1655259273075"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2803"
      >
        <path
          d="M810.666667 554.666667H213.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667h597.333334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666667z"
          p-id="2804"
        ></path>
      </svg>
    </button>
    <button v-if="isMax" class="item" @click="onChangeWindow('scale')" tabindex="-1">
      <svg
        t="1655259165159"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2427"
      >
        <path
          d="M768 170.666667h-341.333333c-46.933333 0-85.333333 38.4-85.333334 85.333333v85.333333H256c-46.933333 0-85.333333 38.4-85.333333 85.333334v341.333333c0 46.933333 38.4 85.333333 85.333333 85.333333h341.333333c46.933333 0 85.333333-38.4 85.333334-85.333333v-85.333333h85.333333c46.933333 0 85.333333-38.4 85.333333-85.333334V256c0-46.933333-38.4-85.333333-85.333333-85.333333zM256 768v-341.333333h341.333333v341.333333H256z m512-170.666667h-85.333333v-170.666666c0-46.933333-38.4-85.333333-85.333334-85.333334h-170.666666V256h341.333333v341.333333z"
          p-id="2428"
        ></path>
      </svg>
    </button>
    <button v-else class="item" @click="onChangeWindow('scale')" tabindex="-1">
      <svg
        t="1655259143272"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2224"
      >
        <path
          d="M768 170.666667H256c-46.933333 0-85.333333 38.4-85.333333 85.333333v512c0 46.933333 38.4 85.333333 85.333333 85.333333h512c46.933333 0 85.333333-38.4 85.333333-85.333333V256c0-46.933333-38.4-85.333333-85.333333-85.333333zM256 768V256h512v512H256z"
          p-id="2225"
        ></path>
      </svg>
    </button>
    <button class="item close" @click="onChangeWindow('close')" tabindex="-1">
      <svg
        t="1655259187200"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2630"
      >
        <path
          d="M571.733333 512l247.466667-247.466667c17.066667-17.066667 17.066667-42.666667 0-59.733333s-42.666667-17.066667-59.733333 0L512 452.266667 264.533333 204.8c-17.066667-17.066667-42.666667-17.066667-59.733333 0s-17.066667 42.666667 0 59.733333l247.466667 247.466667-247.466667 247.466667c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 21.333333 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8l247.466667-247.466667 247.466667 247.466667c8.533333 8.533333 21.333333 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z"
          p-id="2631"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { ipcRenderer } = window.electron
import { log } from '@renderer/utils/log'
import { ref, withDefaults } from 'vue'

withDefaults(
  defineProps<{
    title?: string
    isDark?: boolean
  }>(),
  {
    title: '新窗口',
    isDark: false
  }
)

const isMax = ref(false) // 最大化和还原

//放大缩小关闭
const onChangeWindow = (type: string) => {
  switch (type) {
    case 'min':
      // console.log('缩小')
      ipcRenderer.send('window-min')
      break
    case 'scale':
      ipcRenderer.send('window-max')
      isMax.value = !isMax.value
      break
    case 'close':
      // console.log('关闭')
      ipcRenderer.send('window-close')
      break
  }
}

// 监听窗口最大化状态变化
ipcRenderer.on('window-maximized', (_event, isMaximized) => {
  isMax.value = isMaximized
  if (isMaximized) {
    console.log('窗口已最大化')
  } else {
    console.log('窗口已恢复')
  }
})
</script>

<style scoped lang="scss">
@use 'src/renderer/src/styles/base.scss' as vars;

//s 去除原本的按钮样式
button {
  border: unset;
}

//s 通用样式
.title-bar {
  flex: 0 0 30px;
  width: 100%;
  background-color: vars.$background;

  // 布局样式
  display: flex;
  align-items: center;

  //* 拖拽样式
  app-region: drag;
  -webkit-app-region: drag;

  // 其他样式
  user-select: none;

  .title {
    flex: 1;
    padding: 0 10px;
  }

  button.item {
    width: 30px;
    height: 30px;
    background-color: inherit;
    -webkit-app-region: no-drag;
    display: flex;
    align-items: center;
    transition: background-color 0.25s;
    // transition: 0.25s;
  }
}

//s 浅色主题
.title-bar[is-dark='false'] {
  button.item {
    fill: #000000;
    &:hover {
      background-color: #dadada;
      // fill: #757575;
    }
    &.close:hover {
      background-color: #e81123;
    }
  }
}

//s 深色主题
.title-bar[is-dark='true'] {
  button.item {
    fill: #45484f;
    &:hover {
      background-color: #45484f;
      fill: #ffffff;
    }
    &.close:hover {
      background-color: #e81123;
    }
  }
}
</style>
