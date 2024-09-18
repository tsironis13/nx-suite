import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  doublePrecision,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  price: doublePrecision('price'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export const productCategories = pgTable(
  'product_categories',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
    parentCategoryId: integer('parent_category_id'),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentCategoryId],
        foreignColumns: [table.id],
        name: 'product_categories_parent_category_id_fkey',
      }),
    };
  }
);

export type ProductCategories = InferSelectModel<typeof productCategories>;
export type NewProductCategory = InferInsertModel<typeof productCategories>;
