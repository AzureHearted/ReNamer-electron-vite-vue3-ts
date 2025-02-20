import { log } from '@main/utils/log'
import { BrowserWindow } from 'electron'

// 监听窗口变化事件
export function registerWindowEvents(
  window: BrowserWindow,
  options: {
    preventParentInteraction: boolean // 阻止与父窗口交互
  } = { preventParentInteraction: false }
) {
  const { id } = window
  window.on('show', () => {
    log.info(`显示窗口 (id:${id})`)
    window.webContents.send('window-show')
  })

  // 监听窗口最大化
  window.on('maximize', () => {
    log.info(`窗口最大化 (id:${id})`)
    window.webContents.send('window-maximized', true)
  })

  // 监听窗口还原
  window.on('unmaximize', () => {
    log.info(`窗口还原 (id:${id})`)
    window.webContents.send('window-maximized', false)
  })

  // 监听窗口关闭
  window.on('close', () => {
    log.info(`窗口关闭 (id:${id})`)
    window.webContents.send('window-maximized', false)
  })

  // 监听窗口尺寸变化
  window.on('resized', () => {
    const bounds = window.getBounds()
    log.info(`窗口尺寸变化 (id:${id})`, bounds)
    window.webContents.send('window-resize', bounds)
  })

  window.on('moved', () => {
    const bounds = window.getBounds()
    log.info(`窗口位置变化 (id:${id})`, bounds)
    window.webContents.send('window-resize', bounds)
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

  window.once('closed', () => {
    log.info(`移除窗口的所有监听器 (id:${id})`)
    window.removeAllListeners()
  })
}
