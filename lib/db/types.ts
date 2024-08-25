import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'
import type { GeneratedAlways } from 'kysely'

export interface Database {
  wechat_group: WechatGroupTable,
  category: CategoryTable,
  wechat_group_category: WechatGroupCategoryTable,
  User: UserTable,
  Account: AccountTable,
  Session: SessionTable,
  VerificationToken: VerificationTokenTable,
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

export interface UserTable {
  id: Generated<string>
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
}

export interface AccountTable {
  id: Generated<string>
  userId: string 
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

export interface SessionTable {
  id: Generated<string>
  userId: string 
  sessionToken: string
  expires: Date
}

export interface VerificationTokenTable {
  identifier: string
  token: string
  expires: Date
}
