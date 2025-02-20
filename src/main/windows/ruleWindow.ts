import { BrowserWindow, ipcMain, IpcMainEvent, nativeTheme } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { registerWindowEvents } from './event/window'
import { getThemeBackgroundColor } from './utils'
import { TReNameRule } from '@common/class/ReNameRule'
import { generateRuleByObj } from '@common/class/ReNameRule/utils/generateRuleByObj'
import { log } from '@main/utils/log'

//s 上一次窗口打开时的规则类型
let lastRuleType: TReNameRule['type'] | '' = ''

export function createWindow(
  {
    parent,
    mode,
    ruleData
  }: { parent?: BrowserWindow; mode?: 'add' | 'edit'; ruleData?: TReNameRule } = {
    mode: 'add'
  }
) {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 620,
    height: 450,
    minWidth: 620,
    minHeight: 450,
    show: false,
    parent: parent, //s 设置父窗口
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', // 隐藏默认标题栏
    // frame: false, // 不显示默认窗口栏
    // transparent: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    backgroundColor: getThemeBackgroundColor(),
    webPreferences: {
      preload: join(__dirname, '../preload/rule.js'), // 预加载脚本
      sandbox: false,
      contextIsolation: true, // 是否启用上下文隔离
      nodeIntegration: true // 是否启用 Node.js 集成
    }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境中加载远程 URL，在生产环境中加载本地 html 文件。
  // log.info(process.env['ELECTRON_RENDERER_URL'])
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/rule/${ruleData?.type || lastRuleType}`)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: `/rule/${ruleData?.type || lastRuleType}`
    })
  }

  //f 注册 ipc 事件监听

  // 窗口准备就绪 (监听器)
  ipcMain.handle('rule-window-ready', () => {
    return { mode, ruleData }
  })

  // 窗口关闭 (监听器)
  ipcMain.on('rule-window-type-update', (_event: IpcMainEvent, type: TReNameRule['type']) => {
    // 记录此次规则类型
    lastRuleType = type || ''
    log.info(`窗口规则变化：${lastRuleType}`)
  })

  //* 监听子窗口关闭事件，移除监听器
  win.webContents.on('destroyed', () => {
    ipcMain.removeHandler('rule-window-ready')
    //* 移除频道"rule-window-type-update"的所有监听器
    ipcMain.removeAllListeners('rule-window-type-update')
  })

  //j 注册窗口事件监听
  registerWindowEvents(win)

  win.on('ready-to-show', () => {
    win.show()
  })

  return win
}
