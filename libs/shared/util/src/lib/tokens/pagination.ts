import { InjectionToken } from '@angular/core';
import { Pagination } from '../types';

export const PAGINATION_DEFAULT_CONFIG = new InjectionToken<Pagination>(
  'pagination_default_config',
  {
    providedIn: 'root',
    factory: () => {
      return {
        pageSize: 10,
        pageNumber: 1,
      };
    },
  }
);
