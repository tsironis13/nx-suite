import { router } from '../trpc';
import { noteRouter } from './notes';
import { productRouter } from './products';

export const appRouter = router({
  note: noteRouter,
  product: productRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
