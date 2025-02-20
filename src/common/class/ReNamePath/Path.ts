import {
  ReNamePath as IReNamePath,
  PathInfo as IPathInfo,
  Handle
} from '@common/interface/ReNamePath'
import { extractNumberFromString } from '@common/utils/common'
import { getExt } from '@common/utils/pathUtils'

/**
 * * 路径类
 */
export class Path implements IPathInfo {
  path: string
  name: string
  isDirectory: boolean
  ext: string
  parent: string

  constructor(option: Partial<IPathInfo> = {}) {
    const { path, name, ext, isDirectory, parent } = option
    this.path = path ?? ''
    this.name = name ?? ''
    this.isDirectory = isDirectory ?? false
    this.ext = ext ?? getExt(this.path, this.isDirectory)
    this.parent = parent ?? ''
  }

  get num_in_name(): string {
    return extractNumberFromString(this.name)
  }
  set num_in_name(_value: string) {}
}
