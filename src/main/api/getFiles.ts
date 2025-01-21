import { FileListTableData } from '@common/interface/TableFileListData'
import fs from 'fs'
import path from 'path'

interface IOptions {
  recursive?: boolean
  matchFiles?: boolean
  matchFolders?: boolean
}

export async function getFiles(
  files: string[], // 传入的文件路径列表
  options?: IOptions
): Promise<FileListTableData[]> {
  console.log(`获取文件信息`, files)
  const fileDetails: FileListTableData[] = []

  const defaultOptions = {
    recursive: true,
    matchFiles: true,
    matchFolders: false
  }

  const finalOptions = { ...defaultOptions, ...options }

  async function getFile(filePath: string) {
    try {
      const stats = await fs.promises.stat(filePath)
      const isDirectory = stats.isDirectory()

      if (isDirectory) {
        if (finalOptions.matchFolders) {
          fileDetails.push({
            enabled: true,
            state: 'ok',
            name: path.basename(filePath),
            newName: path.basename(filePath),
            path: filePath,
            size: stats.size,
            isDirectory: isDirectory
          })
        }
        if (finalOptions.recursive) {
          const dirFiles = await fs.promises.readdir(filePath)
          for (const dirFile of dirFiles) {
            await getFile(path.join(filePath, dirFile))
          }
        }
      } else {
        if (finalOptions.matchFiles) {
          fileDetails.push({
            enabled: true,
            state: 'ok',
            name: path.basename(filePath),
            newName: path.basename(filePath),
            path: filePath,
            size: stats.size,
            isDirectory: isDirectory
          })
        }
      }
    } catch (err) {
      console.error('获取文件信息失败:', err)
    }
  }

  // 处理文件路径列表中的每个文件
  for (let i = 0; i < files.length; i++) {
    await getFile(files[i])
  }

  return fileDetails
}
