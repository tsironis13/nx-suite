import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  getAll: publicProcedure.query(() => {
    return {
      totalCount: 45,
      items: [
        { id: 1, name: 'dd', description: 'dfkjdfjk' },
        { id: 2, name: 'ss2', description: 'dfkjdfjk123' },
      ],
    };
  }),
});
