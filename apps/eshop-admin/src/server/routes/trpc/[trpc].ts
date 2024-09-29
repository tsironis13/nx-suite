import { createTrpcNitroHandler } from '@analogjs/trpc';
import { appRouter, createContext } from '@nx-suite/shared/domain/trpc-server';

// export API handler
export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
