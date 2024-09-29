import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../drizzle/db';
import { products } from '../../drizzle/schema';
import { publicProcedure, router } from '../trpc';

export const productRouter = router({
  // create: publicProcedure
  //   .input(
  //     z.object({
  //       price: z.number(),
  //     })
  //   )
  //   .mutation(async ({ input }) => {
  //     console.log(input);
  //     return await db
  //       .insert(products)
  //       .values({ price: input.price })
  //       .returning();
  //   }),
  getPaginated: publicProcedure
    .input(
      z.object({
        pageSize: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await db.select().from(products).limit(input.pageSize);
    }),
  list: publicProcedure.query(async () => {
    return await db.select().from(products);
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await db.delete(products).where(eq(products.id, input.id)).returning()
    ),
});
