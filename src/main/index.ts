import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import iconv from 'iconv-lite'
// import path from 'path'
import fs from 'fs'

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 600,
    minWidth: 600,
    show: false,
    autoHideMenuBar: true,
    frame: false, // 不显示默认窗口栏
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 预加载脚本
      sandbox: false,
      contextIsolation: false, // 设置此项为false后，才可在渲染进程中使用electron api
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境中加载远程 URL，在生产环境中加载本地 html 文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

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

  const win = createWindow()

  // 窗口最大化、最小化、关闭
  ipcMain.on('window-max', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  }),
    ipcMain.on('window-min', function () {
      win.minimize()
    })
  ipcMain.on('window-close', function () {
    console.log('关闭')
    win.close()
  })

  app.on('activate', function () {
    // 在 macOS 上，当点击 Dock 图标并且没有其他窗口打开时，
    // 通常会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 接收渲染进程发送的文件路径
  ipcMain.handle('file-dropped', async (_event, paths: string[]) => {
    // console.log('主进程接收到文件路径:', paths)
    const pathStats: fs.Stats[] = []
    // 你可以在这里读取文件信息，比如文件大小、内容等
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      fs.stat(path, (err, stats) => {
        if (err) {
          console.error('读取文件信息出错:', err)
        } else {
          console.log('文件信息:', stats)
          pathStats.push(stats)
        }
      })
    }

    return pathStats
  })

  ipcMain.on('send-file-paths', (event, filePaths) => {
    console.log('Received file paths:', filePaths)
    event.reply('receive-file-paths', filePaths) // 将文件路径返回给渲染进程
  })
})

// 关闭所有窗口时退出应用，除了在 macOS 上。
// 在 macOS 上，应用及其菜单栏会保持活动状态，直到用户按 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，您可以包含应用特定主进程代码。
// 您也可以将它们放在单独的文件中并在此处 require 它们。
