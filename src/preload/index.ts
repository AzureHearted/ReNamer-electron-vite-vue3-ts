import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getFiles as IGetFiles } from '../main/api/getFiles'
import { TReNameRule } from '@common/class/ReNameRule'
import { generateRuleByObj } from '@common/class/ReNameRule/utils/generateRuleByObj'
import { ReNamePath } from '@common/interface/ReNamePath'

// 渲染器的自定义 API
export const api = {
  main: {
    openWindowToAddRule: () => ipcRenderer.send('open-rule-window', 'add'),
    openWindowToEditRule: (rule: TReNameRule) => ipcRenderer.send('open-rule-window', 'edit', rule)
  },
  rule: {
    ready: async (): Promise<{ mode: 'add' | 'edit'; ruleData: TReNameRule }> =>
      await ipcRenderer.invoke('rule-window-ready')
  },
  getFiles: async (
    files: Parameters<typeof IGetFiles>[0],
    options?: Parameters<typeof IGetFiles>[1]
  ): Promise<ReNamePath[]> => {
    // console.log('准备解析路径:', files)
    return await ipcRenderer.invoke('getFiles', files, options)
  }
}

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
