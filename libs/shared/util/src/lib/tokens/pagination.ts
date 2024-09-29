import { InjectionToken } from '@angular/core';
import { Pagination } from '../types';

export const PAGINATION_DEFAULT_CONFIG = new InjectionToken<Pagination>(
  'pagination_default_config',
  {
    providedIn: 'root',
    factory: () => {
      return {
        pageSize: 25,
        pageNumber: 1,
      };
    },
  }
);
