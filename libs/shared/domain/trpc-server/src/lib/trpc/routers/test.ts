import { db } from '../../drizzle/db';
import { productCategories } from '../../drizzle/schema';
import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  getAll: publicProcedure.query(async () => {
    const x = await db.select().from(productCategories).limit(5);

    return {
      totalCount: 45,
      items: x,
    };
    // return {
    //   totalCount: 45,
    //   items: [
    //     { id: 1, name: 'dd', description: 'dfkjdfjk' },
    //     { id: 2, name: 'ss2', description: 'dfkjdfjk123' },
    //   ],
    // };
  }),
});
