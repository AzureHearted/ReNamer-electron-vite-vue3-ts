import { app, ipcMain, BrowserWindow } from 'electron'
import { getFiles } from '../api/getFiles'

app.whenReady().then(() => {
  // 窗口最大化、最小化、关闭
  ipcMain.on('window-max', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (!win) throw new Error('窗口不存在')
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  }),
    ipcMain.on('window-min', function (e) {
      const win = BrowserWindow.fromWebContents(e.sender)
      if (!win) throw new Error('窗口不存在')
      win.minimize()
    })
  ipcMain.on('window-close', function (e) {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (!win) throw new Error('窗口不存在')
    // console.log('关闭')
    win.close()
  })

  // 监听渲染进程请求窗口最大化状态
  ipcMain.handle('get-maximized-status', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (!win) throw new Error('窗口不存在')
    return win.isMaximized() // 返回窗口是否最大化的状态
  })

  // 接收渲染进程发送的文件路径
  ipcMain.handle(
    'getFiles',
    async (
      _event,
      files: Parameters<typeof getFiles>[0],
      options?: Parameters<typeof getFiles>[1]
    ) => {
      console.log(`(getFiles)渲染进程传入的参数`, files, options)
      return await getFiles(files, options)
    }
  )
})
