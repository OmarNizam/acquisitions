import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
});

export const acquisitions = pgTable('acquisitions', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').references(() => users.id),
  asset_name: varchar('asset_name', { length: 255 }),
  acquired_at: timestamp('acquired_at').defaultNow(),
});
