import {
  ReNamePath as IReNamePath,
  PathInfo as IPathInfo,
  Handle
} from '@common/interface/ReNamePath'
import { extractNumberFromString } from '@common/utils/common'
import { getExt, getNameNoExt } from '@common/utils/pathUtils'
import { Path } from './Path'

/**
 * * ReNamePath类
 */
export class ReNamePath extends Path implements IReNamePath {
  enable: boolean
  newName: string
  state: 'ok' | 'conflict' | 'error'
  size: number
  temp: Pick<IReNamePath, 'newName' | 'ext' | 'isDirectory'> & { newNameNoExt: string }
  initData: Pick<
    IReNamePath,
    'enable' | 'path' | 'name' | 'isDirectory' | 'parent' | 'size' | 'state' | 'newName' | 'ext'
  >

  constructor(option: Partial<IReNamePath> = {}) {
    super(option)
    const { enable, newName, state, size } = option
    this.enable = enable ?? true
    this.newName = newName ?? this.name
    this.size = size ?? 0
    this.state = state ?? 'ok'

    this.temp = {
      newName: this.name,
      isDirectory: this.isDirectory,
      get ext() {
        return getExt(this.newName, this.isDirectory)
      },
      get newNameNoExt() {
        return getNameNoExt(this.newName, this.isDirectory)
      }
    }

    this.initData = {
      enable: this.enable,
      path: this.path,
      name: this.name,
      isDirectory: this.isDirectory,
      parent: this.parent,
      size: this.size,
      state: this.state,
      get newName() {
        return this.name
      },
      get ext() {
        return getExt(this.name, this.isDirectory)
      }
    }
  }

  resetTemp() {
    this.temp.newName = this.initData.name
  }

  saveModify() {
    this.newName = this.temp.newName
    this.resetTemp()
  }

  resetModify() {
    // this.resetTemp()
    this.newName = this.initData.name
  }

  resetAllData() {
    const { enable, path, name, isDirectory, parent, size, state } = this.initData
    this.enable = enable
    this.path = path
    this.name = name
    this.newName = this.initData.newName
    this.ext = this.initData.ext
    this.isDirectory = isDirectory
    this.parent = parent
    this.size = size
    this.state = state
    this.resetTemp()
  }
}
