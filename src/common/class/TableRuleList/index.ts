import { RuleTableData as TableData } from '@common/interface/TableRuleList'
import { ReNameInsertRule, TReNameRule } from '@common/class/ReNameRule'
import { generateRuleByObj } from '../ReNameRule/utils/generateRuleByObj'

export class RuleTableData implements TableData {
  rawData: TReNameRule
  constructor(rawData?: TReNameRule) {
    const data = generateRuleByObj(rawData)
    this.rawData = data ?? new ReNameInsertRule()
  }
}
