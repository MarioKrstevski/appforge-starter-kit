import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Todo = typeof todos.$inferSelect
export type NewTodo = typeof todos.$inferInsert
