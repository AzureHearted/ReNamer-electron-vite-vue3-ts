import type { ReNameRuleBase } from './base'

/** "插入"规则全属性 */
export interface ReNameInsertRuleAll extends ReNameRuleBase {
  /** 规则类型 */
  type: 'insert'
  /** 要插入的内容 */
  text: string
  /** 要插入的位置 */
  position: 'prefix' | 'suffix' | 'index' | 'after' | 'before' | 'replace'
  /** 锚点位置索引 (仅 position = "index" 时生效) */
  anchorIndex: number
  /** 锚点文本 (仅 position = "after_the_text" | "before_the_text" 时生效) */
  anchorText: string
  /** 忽略大小写 (当 anchorText 生效时, 对 anchorText 也生效) */
  ignoreCase: boolean
  /** 全字匹配 (当 anchorText 生效时, 对 anchorText 也生效) */
  isExactMatch: boolean
}

/** 插入规则：基础规则 */
interface ReNameInsertRuleBase extends ReNameRuleBase {
  /** 规则类型 */
  type: 'insert'
  /** 要插入的内容 */
  text: string
}

/** 插入规则：基于整体方向或替换 */
interface ReNameInsertRuleByDirection extends ReNameInsertRuleBase {
  /** 要插入的位置 */
  position: 'prefix' | 'suffix' | 'replace'
}

/** 插入规则：基于索引 */
interface ReNameInsertRuleByIndex extends ReNameInsertRuleBase {
  /** 要插入的位置 */
  position: 'index'
  /** 锚点位置索引 */
  anchorIndex: number
}

/** 插入规则：基于局部方向 */
interface ReNameInsertRuleByAnchorDirection extends ReNameInsertRuleBase {
  /** 要插入的位置 */
  position: 'after_the_text' | 'before_the_text'
  /** 锚点文本  */
  anchorText: string
  /** 忽略大小写  */
  ignoreCase: boolean
}

/** 插入规则类型 */
export type TReNameInsertRule =
  | ReNameInsertRuleByDirection
  | ReNameInsertRuleByIndex
  | ReNameInsertRuleByAnchorDirection
