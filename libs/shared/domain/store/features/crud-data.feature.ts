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
import {
  EntitiesPagination,
  Entity,
  EntityFilterData,
  Filter,
  Pagination,
  providePaginationDefaultConfigToken,
  provideSortingDefaultConfigToken,
  Sort,
} from '@nx-suite/shared/util';
import { delay, exhaustMap, Observable, pipe, switchMap } from 'rxjs';
import {
  NamedCallStateSlice,
  setError,
  setLoaded,
  setLoading,
  withCallStateService,
} from './call-state.feature';
import { withNotificationService } from './notification.feature';

export interface CrudDataService<
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

export function withCrudDataService<
  E extends Entity,
  F extends Filter,
  Z extends Record<string, unknown>,
  S extends CrudDataService<E, F, Z>
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
        pagination = inject(providePaginationDefaultConfigToken()),
        sort = inject(provideSortingDefaultConfigToken())
      ) => ({
        pagination,
        sort,
        filters,
      })
    ),
    withState<{ entity: Partial<E> | null; totalCount: number }>(() => ({
      entity: null,
      totalCount: 0,
    })),
    withCallStateService({ prop: 'entity' }),
    withCallStateService({ prop: 'entityCreate' }),
    withNotificationService(),
    withComputed((store) => ({
      entityFilterParams: computed<EntityFilterData<E, F>>(() => {
        return {
          pagination: store.pagination(),
          filters: store.filters(),
          sort: store.sort(),
        };
      }),
    })),
    withMethods((store) => {
      const dataService = inject(dataServiceType);
      const pagination = inject(providePaginationDefaultConfigToken());
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
                  store.showSuccessNotification('Entity created successfully!');

                  patchState(
                    store,
                    addEntities(entities as E[]),
                    setLoaded('entityCreate')
                  );
                },
                error: (error) => {
                  store.showErrorNotification(
                    `An error occured while creating the entity! ${error}`
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
                    patchState(
                      store,
                      setAllEntities(response.items),
                      {
                        totalCount: response.totalCount,
                      },
                      setLoaded('entity')
                    );
                  },
                  error: (error) => {
                    console.log(error);
                    store.showErrorNotification(
                      `An error occured while fetching entities! ${error}`
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
                    patchState(store, { entity: response[0] });
                  },
                  error: console.error,
                })
              );
            })
          )
        ),
        updateEntity(entity: E | null): void {
          return patchState(store, { entity });
        },
      };
    })
  );
}
