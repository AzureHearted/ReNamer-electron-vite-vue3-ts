import { BrowserWindow, nativeTheme } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { setupWindowEvents } from './manager/windowManager'
import { getThemeBackgroundColor } from './utils'

export async function createWindow({ parent }: { parent?: BrowserWindow } = {}) {
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
      preload: join(__dirname, '../preload/addRule.js'), // 预加载脚本
      sandbox: false,
      contextIsolation: true, // 是否启用上下文隔离
      nodeIntegration: false // 是否启用 Node.js 集成
    }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境中加载远程 URL，在生产环境中加载本地 html 文件。
  // console.log(process.env['ELECTRON_RENDERER_URL'])
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/add-rule`)
  } else {
    await win.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '/add-rule'
    })
  }

  //j 注册窗口事件监听
  setupWindowEvents(win)
  win.show()

  return win
}
