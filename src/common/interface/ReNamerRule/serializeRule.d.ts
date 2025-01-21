import type { ReNameRuleBase } from './base'

/** "序列化"规则 (全参数) */
export interface ReNameSerializeRuleAll extends ReNameRuleBase {
  type: 'serialize'
  /** 要插入序列的位置 */
  position: 'prefix' | 'suffix' | 'index' | 'after_the_text' | 'before_the_text' | 'replace'
  /** 锚点位置索引 (仅 position = "index" 时生效) */
  anchorIndex: number
  /** 锚点文本 (仅 position = "after_the_text" | "before_the_text" 时生效) */
  anchorText: string
  /** 序列起始值 */
  sequenceStart: number
  /** 序列步长 */
  sequenceStep: number
  /** 补零数量 (-1:自动填充 0：不进行补零 >0:填充指定数量的0) */
  paddingCount: number
  /** 文件夹变更重置 */
  resetFolderChanges: boolean
  /** 忽略大小写 (当 anchorText 生效时, 对 anchorText 也生效) */
  ignoreCase: boolean
  /** 全字匹配 (当 anchorText 生效时, 对 anchorText 也生效) */
  isExactMatch: boolean
}

/** 序列化：基础规则 */
interface ReNameSerializeRuleBase extends ReNameRuleBase {
  /** 规则类型 */
  type: 'serialize'
  /** 序列起始 */
  sequenceStart: number
  /** 序列步长 */
  sequenceStep: number
  /** 补零数量 (-1:自动填充 0：不进行补零 >0:填充指定数量的0) */
  paddingCount: number
  /** 文件夹变更重置 */
  resetFolderChanges: boolean
}

/** 序列化规则：基于整体方向或替换 */
export interface ReNameSerializeRuleByDirection extends ReNameSerializeRuleBase {
  /** 要插入序列的位置 */
  position: 'prefix' | 'suffix' | 'replace'
}

/** 序列化规则：基于索引 */
interface ReNameSerializeRuleByIndex extends ReNameSerializeRuleBase {
  /** 要插入的位置 */
  position: 'index'
  /** 锚点位置索引 */
  anchorIndex: number
}

/** 序列化规则：基于局部方向 */
interface ReNameSerializeRuleByAnchorDirection extends ReNameSerializeRuleBase {
  /** 要插入的位置 */
  position: 'index'
  /** 锚点文本  */
  anchorText: string
  /** 忽略大小写  */
  ignoreCase: boolean
  /** 全字匹配  */
  isExactMatch: boolean
}

/** 序列化规则类型 */
export type TReNameSerializeRule =
  | ReNameSerializeRuleByDirection
  | ReNameSerializeRuleByIndex
  | ReNameSerializeRuleByAnchorDirection
