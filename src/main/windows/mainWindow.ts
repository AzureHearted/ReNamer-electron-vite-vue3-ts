import { shell, BrowserWindow, ipcMain, systemPreferences, nativeTheme } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { setupWindowEvents } from './manager/windowManager'
import { createWindow as createAddRuleWindow } from './addRuleWindow'
import { getThemeBackgroundColor } from './utils'

export async function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 900,
    height: 788,
    minWidth: 600,
    minHeight: 620,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', // 隐藏默认标题栏
    // frame: false, // 不显示默认窗口栏
    // transparent: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    backgroundColor: getThemeBackgroundColor(),
    webPreferences: {
      preload: join(__dirname, '../preload/main.js'), // 预加载脚本
      sandbox: false,
      contextIsolation: true, // 是否启用上下文隔离
      nodeIntegration: false // 是否启用 Node.js 集成
    }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境中加载远程 URL，在生产环境中加载本地 html 文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // [开发环境]加载vite URL
    await win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // [生产环境]加载本地 html 文件
    await win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // win.on('ready-to-show', () => {
  //   // 注册窗口事件监听
  //   setupWindowEvents(win)
  //   win.show()
  // })

  // 注册窗口事件监听
  setupWindowEvents(win)
  win.show()

  return win
}

// export const window = createWindow()

// 窗口管理
const windowsPond: Map<string, BrowserWindow> = new Map()

//f 打开添加规则窗口
ipcMain.on('open-addRule-window', async (e) => {
  const winKey = 'open-addRule-window'
  const parentWindow = BrowserWindow.fromWebContents(e.sender)
  let addRuleWindow = windowsPond.get(winKey)

  if (!addRuleWindow || addRuleWindow.isDestroyed()) {
    if (parentWindow) {
      //s 创建子添加规则窗口
      addRuleWindow = await createAddRuleWindow({ parent: parentWindow })
      windowsPond.set(winKey, addRuleWindow)
      //j 监听子窗口事件
      addRuleWindow.on('closed', () => {
        // 通知主窗口子窗口已关闭
        parentWindow.webContents.send('add-rule-window-closed')
      })
    }
  } else {
    addRuleWindow.restore()
  }
})
