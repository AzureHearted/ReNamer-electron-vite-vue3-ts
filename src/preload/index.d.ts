// import { ElectronAPI } from '@electron-toolkit/preload'
import { api, electron } from './index'

declare global {
  interface Window {
    electron: typeof electron
    api: typeof api
  }
}
