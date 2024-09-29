import { InjectionToken } from '@angular/core';
import { Entity } from '../types';
import { Sort } from '../types/sort';

export function provideSortingDefaultConfigToken<Z extends Entity>() {
  return new InjectionToken<Sort<Z>>('sorting_default_config', {
    providedIn: 'root',
    factory: () => {
      return {
        sortOrder: 'desc',
        sortBy: 'id',
      };
    },
  });
}
