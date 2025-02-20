import { ReNamePath } from '@common/class/ReNamePath'
import { getPathInfo } from '@common/utils/pathUtils'
const fs = require('fs') as typeof import('fs')
// import fs from 'fs'
const path = require('path') as typeof import('path')
// import path from 'path'
import { log } from '@main/utils/log'

interface Options {
  /** 深度递归 */
  recursive?: boolean
  /** 匹配文件 */
  matchFiles?: boolean
  /** 匹配文件夹 */
  matchFolders?: boolean
}

/**
 * 获取文件信息
 * @param files 文件路径列表
 * @param options 选项
 * @returns
 */
export async function getFiles(
  files: string[], // 传入的文件路径列表
  options?: Options
): Promise<ReNamePath[]> {
  log.info(`获取文件信息`, files)

  const fileDetails: ReNamePath[] = []

  const defaultOptions = {
    recursive: true,
    matchFiles: true,
    matchFolders: false
  }

  const finalOptions = { ...defaultOptions, ...options }

  async function getFile(filePath: string) {
    try {
      const info = await getPathInfo(filePath)
      log.info('获取文件信息', info)
      const { name, isDirectory, size, parent } = info

      if (isDirectory) {
        if (finalOptions.matchFolders) {
          fileDetails.push(
            new ReNamePath({
              enable: true,
              path: filePath,
              name,
              size,
              parent,
              isDirectory
            })
          )
        }
        if (finalOptions.recursive) {
          const dirFiles = await fs.promises.readdir(filePath)
          for (const dirFile of dirFiles) {
            await getFile(path.join(filePath, dirFile))
          }
        }
      } else {
        if (finalOptions.matchFiles) {
          fileDetails.push(
            new ReNamePath({
              enable: true,
              path: filePath,
              name,
              size,
              parent,
              isDirectory
            })
          )
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
