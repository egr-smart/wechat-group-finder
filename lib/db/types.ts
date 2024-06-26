import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  wechat_group: WechatGroupTable,
  category: CategoryTable,
  wechat_group_category: WechatGroupCategoryTable,
}

export interface WechatGroupTable {
  id: Generated<number>
  name: string
  wechat_id: string
  description: string
  created_at: ColumnType<Date, string | undefined, never>
}

export type WechatGroup = Selectable<WechatGroupTable>
export type NewWechatGroup = Insertable<WechatGroupTable>
export type UpdateWechatGroup = Updateable<WechatGroupTable>

export interface CategoryTable {
  id: Generated<number>
  name: string
}

export interface WechatGroupCategoryTable {
  id: Generated<number>
  wechat_group_id: number
  category_id: number
}

export type WechatGroupCategory = Selectable<WechatGroupCategoryTable>
export type NewWechatGroupCategory = Insertable<WechatGroupCategoryTable>
export type UpdateWechatGroupCategory = Updateable<WechatGroupCategoryTable>
