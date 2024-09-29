import { aliasedTable, asc, eq, SQL } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';
import { optional, z } from 'zod';
import { db } from '../../drizzle/db';
import { productCategories } from '../../drizzle/schema';
import { publicProcedure, router } from '../trpc';

function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 25
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

const parent = aliasedTable(productCategories, 'parent');

export const productCategoryRouter = router({
  getByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await db
        .select()
        .from(productCategories)
        .where(eq(productCategories.name, input.name))
        .limit(2);
    }),
  getPaginated: publicProcedure
    .input(
      z.object({
        pagination: z.object({
          pageSize: z.number(),
          pageNumber: z.number(),
        }),
        sort: z.object({
          sortBy: z.string(),
          sortOrder: z.string(),
        }),
        filters: optional(
          z.object({
            name: z.string(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const query = db
        .select({
          id: productCategories.id,
          name: productCategories.name,
          description: productCategories.description,
          parentCategoryName: parent.name,
        })
        .from(productCategories)
        .leftJoin(parent, eq(parent.id, productCategories.parentCategoryId));
      return await withPagination(
        query.$dynamic(),
        asc(productCategories.id),
        input.pagination.pageNumber,
        input.pagination.pageSize
      );

      //return await db.select().from(productCategories).limit(input);
    }),
  list: publicProcedure.query(async () => {
    return await db.select().from(productCategories).limit(2);
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await db
          .delete(productCategories)
          .where(eq(productCategories.id, input.id))
          .returning()
    ),
});
