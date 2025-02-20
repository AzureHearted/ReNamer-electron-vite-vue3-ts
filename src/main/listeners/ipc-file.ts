import { ipcMain } from 'electron'
import { log } from '@main/utils/log'
import { getFiles } from '../api/getFiles'

//f 接收渲染进程发送的文件路径
ipcMain.handle(
  'getFiles',
  async (
    _event,
    files: Parameters<typeof getFiles>[0],
    options?: Parameters<typeof getFiles>[1]
  ) => {
    log.info(`(getFiles)渲染进程传入的参数`, files, options)
    return await getFiles(files, options)
  }
)
