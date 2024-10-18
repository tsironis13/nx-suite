import { InjectionToken } from '@angular/core';
import { Pagination } from '../types';

export function providePaginationDefaultConfigToken() {
  return new InjectionToken<Pagination>('pagination_default_config', {
    providedIn: 'root',
    factory: () => {
      return {
        pageSize: 10,
        pageNumber: 1,
      };
    },
  });
}
