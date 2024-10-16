import { router } from '../trpc';
import { productCategoryRouter } from './categories';
import { noteRouter } from './notes';
import { productRouter } from './products';
import { testRouter } from './test';

export const appRouter = router({
  note: noteRouter,
  product: productRouter,
  productCategory: productCategoryRouter,
  test: testRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
