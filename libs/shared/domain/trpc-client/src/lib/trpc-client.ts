import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import type { AppRouter } from '@nx-suite/shared/domain/trpc-server';

export const { provideTrpcClient, TrpcClient, TrpcHeaders } =
  createTrpcClient<AppRouter>({
    url: '/api/trpc',
  });

export function injectTrpcClient() {
  return inject(TrpcClient);
}
