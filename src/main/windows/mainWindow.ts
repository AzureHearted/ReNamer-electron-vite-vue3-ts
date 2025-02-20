import { shell, BrowserWindow, ipcMain, systemPreferences, nativeTheme } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { registerWindowEvents } from './event/window'
import { createWindow as createAddRuleWindow } from './ruleWindow'
import { getThemeBackgroundColor } from './utils'
import { generateRuleByObj } from '@common/class/ReNameRule/utils/generateRuleByObj'
import { TReNameRule } from '@common/class/ReNameRule'
import { log } from '@main/utils/log'

export function createWindow() {
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
      contextIsolation: false, // 是否启用上下文隔离
      nodeIntegration: true // 是否启用 Node.js 集成
    }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境中加载远程 URL，在生产环境中加载本地 html 文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // [开发环境]加载vite URL
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // [生产环境]加载本地 html 文件
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //j 添加规则
  ipcMain.on('handle-addRule', (_event, ruleJson: string) => {
    const rawRule = JSON.parse(ruleJson)
    const rule = generateRuleByObj(rawRule)
    if (!rule) throw new Error('规则解析错误！')
    log.info('添加规则', rule)
    win.webContents.send('add-rule', rule)
  })

  ipcMain.on('handle-updateRule', (_event, ruleJson: string) => {
    const rawRule = JSON.parse(ruleJson)
    const rule = generateRuleByObj(rawRule)
    if (!rule) throw new Error('规则解析错误！')
    log.info('更新规则', rule)
    win.webContents.send('update-rule', rule)
  })

  //j 注册窗口事件监听
  registerWindowEvents(win)

  win.on('ready-to-show', () => {
    win.show()
  })

  return win
}

// export const window = createWindow()

//* 窗口管理
const windowsManager: Map<string, BrowserWindow> = new Map()

//f 打开规则窗口（添加or编辑规则）
ipcMain.on('open-rule-window', (_event, mode: 'add' | 'edit' = 'add', ruleData?: TReNameRule) => {
  const winKey = 'rule-window'
  const parentWindow = BrowserWindow.fromWebContents(_event.sender)
  let addRuleWindow = windowsManager.get(winKey)

  if (!addRuleWindow || addRuleWindow.isDestroyed()) {
    if (parentWindow) {
      //s 创建子添加规则窗口
      addRuleWindow = createAddRuleWindow({ parent: parentWindow, mode, ruleData })
      windowsManager.set(winKey, addRuleWindow)
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
