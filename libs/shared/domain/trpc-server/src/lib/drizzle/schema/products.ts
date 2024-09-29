import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  //price: doublePrecision('price'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
