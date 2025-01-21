import { BrowserWindow } from 'electron'

// 监听窗口事件
export function setupWindowEvents(
  window: BrowserWindow,
  options: {
    preventParentInteraction: boolean
  } = { preventParentInteraction: false }
) {
  // 监听窗口最大化
  window.on('maximize', () => {
    window.webContents.send('window-maximized', true)
  })

  // 监听窗口还原
  window.on('unmaximize', () => {
    window.webContents.send('window-maximized', false)
  })

  const parent = window.getParentWindow()
  if (parent) {
    if (options.preventParentInteraction) parent.setEnabled(false)
    window.on('minimize', () => {
      if (options.preventParentInteraction) parent.setEnabled(true)
      parent.minimize()
      if (options.preventParentInteraction) parent.setEnabled(false)
    })
    window.on('restore', () => {
      if (options.preventParentInteraction) parent.setEnabled(true)
      parent.minimize()
      if (options.preventParentInteraction) parent.setEnabled(false)
    })
    window.on('close', () => {
      if (options.preventParentInteraction) parent.setEnabled(true)
    })
  }
}
