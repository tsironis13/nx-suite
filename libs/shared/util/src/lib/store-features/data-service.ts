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
import { addEntities, EntityId, setAllEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, exhaustMap, Observable, pipe, switchMap } from 'rxjs';
import { PAGINATION_DEFAULT_CONFIG } from '../tokens';
import { provideSortingDefaultConfigToken } from '../tokens/sorting';
import { Entity, EntityFilterData, Filter, Pagination } from '../types';
import {
  setLoaded,
  setLoading,
  withCallStateService,
} from './call-state.service';

export interface DataService<
  E extends Entity,
  F extends Filter,
  Z extends Record<string, unknown>
> {
  getByFilterAndPagination(params: EntityFilterData<E, F>): Observable<E[]>;
  create(params: Z): Observable<Partial<E>[]>;
}

export function withDataService<
  E extends Entity,
  F extends Filter,
  Z extends Record<string, unknown>,
  S extends DataService<E, F, Z>
>(dataServiceType: Type<S>, filters: F) {
  return signalStoreFeature(
    {
      state: type<{
        entityMap: Record<EntityId, E>;
        form: Z;
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
    withCallStateService({ prop: 'entity' }),
    withCallStateService({ prop: 'entityCreate' }),
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
        create: rxMethod<void>(
          exhaustMap(() => {
            patchState(store, setLoading('entityCreate'));
            return dataService.create(store.form()).pipe(
              delay(500),
              tapResponse({
                next: (entities) => {
                  patchState(store, setLoaded('entityCreate'));
                  patchState(store, addEntities(entities as E[]));
                },
                error: console.error,
              })
            );
          })
        ),
        getByFilterAndPagination: rxMethod<EntityFilterData<E, F>>(
          pipe(
            switchMap((params) => {
              patchState(store, setLoading('entity'));
              return dataService.getByFilterAndPagination(params).pipe(
                tapResponse({
                  next: (entities) => {
                    patchState(store, setLoaded('entity'));
                    patchState(store, setAllEntities(entities));
                  },
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
