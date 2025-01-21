import type {
  ReNameInsertRuleAll as IReNameInsertRuleAll,
  ReNameInsertRuleByDirection as IReNameInsertRuleByDirection,
  ReNameInsertRuleByAnchorDirection as IReNameInsertRuleByAnchorDirection,
  ReNameInsertRuleByIndex as IReNameInsertRuleByIndex
} from '../../interface/ReNamerRule/insertRule'

/**
 * 插入规则：基于整体方向或替换
 */
class ReNameInsertRuleByDirection implements IReNameInsertRuleByDirection {
  type: 'insert' = 'insert'
  text: string
  position: 'prefix' | 'suffix' | 'replace'
  ignoreExt: boolean

  constructor(
    options: Omit<IReNameInsertRuleByDirection, 'type'> = {
      position: 'prefix',
      text: '',
      ignoreExt: true
    }
  ) {
    const { position, text, ignoreExt } = options
    this.text = text
    this.position = position
    this.ignoreExt = ignoreExt
  }
}

/**
 * 插入规则：基于局部方向
 */
class ReNameInsertRuleByAnchorDirection implements IReNameInsertRuleByAnchorDirection {
  type: 'insert' = 'insert'
  text: string
  position: 'after_the_text' | 'before_the_text'
  anchorText: string
  ignoreExt: boolean
  ignoreCase: boolean

  constructor(
    options: Omit<IReNameInsertRuleByAnchorDirection, 'type'> = {
      position: 'after_the_text',
      text: '',
      anchorText: '',
      ignoreCase: false,
      ignoreExt: true
    }
  ) {
    const { position, text, anchorText, ignoreCase, ignoreExt } = options
    this.text = text
    this.position = position
    this.anchorText = anchorText
    this.ignoreCase = ignoreCase
    this.ignoreExt = ignoreExt
  }
}

/**
 * 插入规则：基于局部方向
 */
class ReNameInsertRuleByIndex implements IReNameInsertRuleByIndex {
  type: 'insert' = 'insert'
  text: string
  position: 'index' = 'index'
  anchorIndex: number
  ignoreExt: boolean

  constructor(
    options: Omit<IReNameInsertRuleByIndex, 'type' | 'position'> = {
      text: '',
      anchorIndex: 1,
      ignoreExt: true
    }
  ) {
    const { text, anchorIndex, ignoreExt } = options
    this.text = text
    this.anchorIndex = anchorIndex
    this.ignoreExt = ignoreExt
  }
}

/** 插入规则 */
export class ReNameInsertRule implements IReNameInsertRuleAll {
  type: 'insert' = 'insert'
  text: string
  position: 'prefix' | 'suffix' | 'index' | 'after_the_text' | 'before_the_text' | 'replace'
  anchorIndex: number
  anchorText: string
  ignoreCase: boolean
  ignoreExt: boolean

  constructor(
    options: Omit<IReNameInsertRuleAll, 'type'> = {
      position: 'prefix',
      text: '',
      anchorIndex: 1,
      anchorText: '',
      ignoreCase: false,
      ignoreExt: true
    }
  ) {
    const { position, text, anchorIndex, anchorText, ignoreCase, ignoreExt } = options
    this.position = position
    this.text = text
    this.anchorIndex = anchorIndex
    this.anchorText = anchorText
    this.ignoreCase = ignoreCase
    this.ignoreExt = ignoreExt
  }
}
