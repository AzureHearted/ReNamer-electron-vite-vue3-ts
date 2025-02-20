import { ipcMain, BrowserWindow } from 'electron'
import { log } from '@main/utils/log'

// 窗口最大化、最小化、关闭
ipcMain.on('window-max', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (!win) return log.error('窗口不存在')
  if (win.isMaximized()) {
    log.info(`窗口恢复 (id: ${win.id})`)
    win.restore()
  } else {
    log.info(`窗口最大化 (id: ${win.id})`)
    win.maximize()
  }
}),
  ipcMain.on('window-min', function (e) {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (!win) return log.error('窗口不存在')
    log.info(`窗口最小化 (id: ${win.id})`)
    win.minimize()
  })

ipcMain.on('window-close', function (e) {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (!win) throw new Error('窗口不存在')
  // log.info(`窗口关闭 (id: ${win.id})`)
  win.close()
})

// 监听渲染进程请求窗口最大化状态
ipcMain.handle('get-maximized-status', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (!win) throw new Error('窗口不存在')
  return win.isMaximized() // 返回窗口是否最大化的状态
})
