import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import type { AppRouter } from '@nx-suite/shared/domain/trpc-server';
import { httpBatchLink } from '@trpc/client';

export const { provideTrpcClient, TrpcClient, TrpcHeaders } =
  createTrpcClient<AppRouter>({
    url: `/api/trpc`,
    options: {
      links: [
        httpBatchLink({
          url: getBaseUrl() + '/api/trpc',
        }),
      ],
    },
  });

export function injectTrpcClient() {
  return inject(TrpcClient);
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env['VERCEL_URL']) {
    return `https://${process.env['VERCEL_URL']}`;
  }

  return `http://localhost:${process.env['PORT'] ?? 3000}`;
}
