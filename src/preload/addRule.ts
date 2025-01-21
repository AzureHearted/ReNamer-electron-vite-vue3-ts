import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 渲染器的自定义 API
export const api = {}

export const electron = {
  ...electronAPI
}

// 仅在启用上下文隔离时使用 `contextBridge` API 将 Electron API 暴露给渲染器，否则只需添加到 DOM 全局对象。
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electron)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (在 dts 中定义)
  window.electron = electron
  // @ts-ignore (define in dts)
  window.api = api
}
