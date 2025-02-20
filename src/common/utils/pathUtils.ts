const path = require('path') as typeof import('path')
// import path from 'path'
const fs = require('fs') as typeof import('fs')
// import fs from 'fs'

/**
 * 检查路径是否存在
 * @param filePath 路径
 * @returns 是否存在
 */
export function isExist(filePath: string): boolean {
  return fs.existsSync(filePath)
}

/**
 * 获取扩展名部分
 * @description 渲染进程要使用改方法必须开启 ===> nodeIntegration: true,contextIsolation: false
 * @param filePath 路径or名称
 * @param isDirectory 是否是文件夹
 * @returns 获取到的扩展名部分，包含"."
 */
export function getExt(filePath: string, isDirectory?: boolean): string {
  if (isDirectory) return '' // 目录没有扩展名，直接返回 ''
  const index = filePath.lastIndexOf('.')
  if (index < 0) return ''

  return filePath.slice(index)
}

interface GetNameOptions {
  /** 是否包含扩展名 */
  includeExt?: boolean
  /** 是否是文件夹 */
  isDirectory?: boolean
}
/**
 * 获取路径名称(文件or文件夹)
 * @description 渲染进程要使用改方法必须开启 ===> nodeIntegration: true,contextIsolation: false
 * @param filePath 路径
 * @return 文件名
 */
export function getName(filePath: string, options: GetNameOptions = {}): string {
  if (!filePath) return ''
  const { isDirectory, includeExt } = options
  const { base: fullName } = path.parse(filePath)
  if (isDirectory) {
    // 如果是目录则直接返回全名
    return fullName
  } else {
    // 不是目录的情况
    if (includeExt) {
      // 如果要包含扩展名则直接返回全名
      return fullName
    } else {
      return getNameNoExt(filePath, isDirectory)
    }
  }
}

/**
 * 获取文件名(不含扩展名)
 * @param filePath 路径
 * @param isDirectory 是否是文件夹
 * @returns 文件名(不含扩展名)
 */
export function getNameNoExt(filePath: string, isDirectory?: boolean) {
  if (isDirectory) {
    return filePath
  } else {
    const name = path.basename(filePath)
    const lastDotIndex = name.lastIndexOf('.')
    if (lastDotIndex === -1) return name
    return name.slice(0, lastDotIndex)
  }
}

/**
 * 获取路径信息
 * @param filePath
 * @returns 路径信息
 */
export async function getPathInfo(filePath: string) {
  // 获取路径基础信息
  const { base: name, dir: parent, root } = path.parse(filePath)
  // 获取路径元信息
  const stats = await fs.promises.stat(filePath)
  const isDirectory = stats.isDirectory()
  const { size, mode } = stats
  const ext = getExt(filePath, isDirectory)
  return {
    parent,
    path: filePath,
    name,
    nameNoExt: getNameNoExt(filePath, isDirectory),
    ext,
    isDirectory,
    size,
    root,
    extra: {
      mode
    }
  }
}
