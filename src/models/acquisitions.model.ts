import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.model.js';

export const acquisitions = pgTable('acquisitions', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').references(() => users.id),
  asset_name: varchar('asset_name', { length: 255 }),
  acquired_at: timestamp('acquired_at').defaultNow(),
});
