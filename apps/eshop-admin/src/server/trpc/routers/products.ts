import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db } from '../../../drizzle/db';
import { eq } from 'drizzle-orm';
import { products } from '../../../drizzle/schema';

export const productRouter = router({
  create: publicProcedure
    .input(
      z.object({
        price: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      return await db
        .insert(products)
        .values({ price: input.price })
        .returning();
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
