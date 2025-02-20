/**
 * * 要重命名的文件信息
 */
export interface ReNamePath extends PathInfo, ExtraInfo, Handle {
  /** 新名称 */
  newName: string
  /** 允许修改 */
  enable: boolean
  /** 状态 */
  state: 'ok' | 'conflict' | 'error'
  /** 缓存 */
  temp: Pick<ReNamePath, 'newName' | 'ext' | 'isDirectory'> & { newNameNoExt: string }
  /** 初始数据 */
  initData: Pick<
    ReNamePath,
    'enable' | 'path' | 'name' | 'isDirectory' | 'parent' | 'size' | 'state' | 'newName' | 'ext'
  >
}

interface Handle {
  /**
   * 备份数据
   */
  // backupData: () => void
  /**
   * 恢复数据
   */
  // recoveryData: () => void
  /**
   * 保存修改
   */
  saveModify: () => void
  /**
   * 重置缓存
   */
  resetTemp: () => void
  /**
   * 重置修改
   */
  resetModify: () => void
  /**
   * 重置所有数据
   */
  resetAllData: () => void
}

/**
 * * 路径信息
 */
export interface PathInfo {
  /** 路径 */
  path: string
  /** 名称 */
  name: string
  /** 扩展名 */
  ext: string
  /** 是否是目录 */
  isDirectory: boolean
  /** 所属目录 */
  parent: string
  /** 路径中的数字 */
  num_in_name: string
}

/** 额外信息 */
export interface ExtraInfo {
  /** 大小 */
  size: number
}
