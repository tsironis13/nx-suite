import { computed, inject, Signal, Type } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EntityId, setAllEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap } from 'rxjs';
import { PAGINATION_DEFAULT_CONFIG } from '../tokens';
import { provideSortingDefaultConfigToken } from '../tokens/sorting';
import { Entity, EntityFilterData, Filter, Pagination } from '../types';

export interface DataService<E extends Entity, F extends Filter> {
  load(params: EntityFilterData<E, F>): Observable<E[]>;
}

export function withDataService<
  E extends Entity,
  F extends Filter,
  S extends DataService<E, F>
>(dataServiceType: Type<S>, filters: F) {
  return signalStoreFeature(
    {
      state: type<{
        entityMap: Record<EntityId, E>;
        ids: EntityId[];
      }>(),
      signals: type<{
        entities: Signal<Entity[]>;
      }>(),
    },
    withState<EntityFilterData<E, F>>(
      (
        pagination = inject(PAGINATION_DEFAULT_CONFIG),
        sort = inject(provideSortingDefaultConfigToken())
      ) => ({
        pagination,
        sort,
        filters,
      })
    ),
    withComputed((store) => ({
      entityFilterParams: computed(() => {
        return {
          pagination: store.pagination(),
          filters: store.filters(),
          sort: store.sort(),
        };
      }),
    })),
    withMethods((store) => {
      const dataService = inject(dataServiceType);
      return {
        updatePagination(pagination: Pagination): void {
          return patchState(store, { pagination });
        },
        updateFilter(filter: F): void {
          return patchState(store, { filters: filter });
        },
        load: rxMethod<EntityFilterData<E, F>>(
          pipe(
            switchMap((params) => {
              return dataService.load(params).pipe(
                tapResponse({
                  next: (entities) =>
                    patchState(store, setAllEntities(entities)),
                  error: console.error,
                })
              );
            })
          )
        ),
      };
    })
  );
}
