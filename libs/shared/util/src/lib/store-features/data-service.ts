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
import { AlertService } from '../services';
import { PAGINATION_DEFAULT_CONFIG } from '../tokens';
import { provideSortingDefaultConfigToken } from '../tokens/sorting';
import {
  EntitiesPagination,
  Entity,
  EntityFilterData,
  Filter,
  Pagination,
  Sort,
} from '../types';
import {
  NamedCallStateSlice,
  setError,
  setLoaded,
  setLoading,
  withCallStateService,
} from './call-state.service';

export interface DataService<
  E extends Entity,
  F extends Filter,
  Z extends Record<string, unknown>
> {
  getByFilterAndPagination(
    params: EntityFilterData<E, F>
  ): Observable<EntitiesPagination<E>>;
  create(params: Z): Observable<Partial<E>[]>;
  getById(id: number): Observable<Partial<E>[]>;
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
    withState<{ totalCount: number }>(() => ({ totalCount: 0 })),
    withState<{ selectedEntity: Partial<E> | null }>(() => ({
      selectedEntity: null,
    })),
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
      const alertService = inject(AlertService);
      const pagination = inject(PAGINATION_DEFAULT_CONFIG);
      return {
        updatePagination(pagination: Pagination): void {
          return patchState(store, { pagination });
        },
        updateSort(sort: Sort<E>): void {
          return patchState(store, {
            sort,
            pagination: {
              ...store.pagination(),
              pageNumber: pagination.pageNumber,
            },
          });
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
                  alertService.showNotification(
                    'Entity created successfully!',
                    'Success!',
                    'success'
                  );

                  patchState(store, setLoaded('entityCreate'));
                  patchState(store, addEntities(entities as E[]));
                },
                error: (error) => {
                  alertService.showNotification(
                    `An error occured while creating the entity! ${error}`,
                    'An error occured!',
                    'error'
                  );

                  patchState(
                    store,
                    setError(
                      error as string,
                      'entityCreate'
                    ) as NamedCallStateSlice<'entityCreate'>
                  );
                },
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
                  next: (response) => {
                    patchState(store, setLoaded('entity'));
                    patchState(store, { totalCount: response.totalCount });
                    patchState(store, setAllEntities(response.items));
                  },
                  error: (error) => {
                    alertService.showNotification(
                      `An error occured while fetching entities! ${error}`,
                      'An error occured!',
                      'error'
                    );

                    patchState(
                      store,
                      setError(
                        error as string,
                        'entity'
                      ) as NamedCallStateSlice<'entity'>
                    );
                  },
                })
              );
            })
          )
        ),
        getById: rxMethod<number>(
          pipe(
            switchMap((id: number) => {
              return dataService.getById(+id).pipe(
                tapResponse({
                  next: (response) => {
                    patchState(store, { selectedEntity: response[0] });
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
