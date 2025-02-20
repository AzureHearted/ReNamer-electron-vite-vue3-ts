import { PathTableData as TableData } from '@common/interface/TablePathList'
import { ReNamePath } from '@common/class/ReNamePath'
import { extractNumberFromString } from '@common/utils/common'

export class PathTableData implements TableData {
  rawData: ReNamePath
  constructor(rawData?: ReNamePath) {
    const data = new ReNamePath(rawData)
    this.rawData = data
  }
}
