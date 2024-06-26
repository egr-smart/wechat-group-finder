import type { Kysely } from 'kysely'

console.log("Database:", process.env.DB_DATABASE);
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Password:", process.env.DB_PASSWORD);
console.log("Port:", process.env.DB_PORT);

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('wechat_group')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .execute()

  await db.schema
    .createTable('category')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .execute()

  await db.schema
    .createTable('wechat_group_category')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('wechat_group_id', 'integer', (col) =>
      col.references('wechat_group.id').onDelete('cascade').notNull(),
    )
    .addColumn('category_id', 'integer', (col) =>
      col.references('category.id').onDelete('cascade').notNull(),
    )
    .execute()

  await db.schema
    .createIndex('wechat_group_category_id_index')
    .on('wechat_group_category')
    .column('wechat_group_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('wechat_group_category').execute()
  await db.schema.dropTable('wechat_group').execute()
  await db.schema.dropTable('category').execute()
}
