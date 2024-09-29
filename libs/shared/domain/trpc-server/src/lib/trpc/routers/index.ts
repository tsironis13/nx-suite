import { router } from '../trpc';
import { productCategoryRouter } from './categories';
import { noteRouter } from './notes';
import { productRouter } from './products';

export const appRouter = router({
  note: noteRouter,
  product: productRouter,
  productCategory: productCategoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
