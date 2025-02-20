import { app, BrowserView, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow as createMainWindow } from './windows/mainWindow'

// 加载所有 IPC 监听器
import '@main/listeners'

// 主窗口对象
let mainWindow: BrowserWindow

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法。
// 某些 API 只能在此事件发生后才能使用。
app.whenReady().then(() => {
  // 为 Windows 设置应用用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 在开发环境中默认通过 F12 打开或关闭开发者工具，
  // 在生产环境中忽略 CommandOrControl + R。
  // 参见 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', async () => {
    // 在 macOS 上，当点击 Dock 图标并且没有其他窗口打开时，
    // 通常会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = await createMainWindow()
  })

  mainWindow = createMainWindow()
})

// 关闭所有窗口时退出应用，除了在 macOS 上。
// 在 macOS 上，应用及其菜单栏会保持活动状态，直到用户按 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
