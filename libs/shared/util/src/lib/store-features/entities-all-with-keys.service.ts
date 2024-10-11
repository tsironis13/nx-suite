import { computed, inject, Signal, Type } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  SignalStoreFeature,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, Observable, pipe, switchMap } from 'rxjs';
import { Entity } from '../types';
import {
  NamedCallStateComputed,
  setLoaded,
  setLoading,
  withCallStateService,
} from './call-state.service';

type WithAllEntitiesStateComputed = {
  entitiesAll: Signal<Entity[]>;
};

export interface EntitiesAllService<E extends Entity> {
  getAllWithKeys(params: (keyof E)[]): Observable<Partial<E>[]>;
}

export function withEntitiesAllService<
  E extends Entity,
  S extends EntitiesAllService<E>,
  Prop extends string
>(
  dataServiceType: Type<S>,
  prop: Prop
): SignalStoreFeature<
  {
    state: Record<never, never>;
    computed: Record<never, never>;
    methods: Record<never, never>;
  },
  {
    state: { allWithKeys: E[] };
    computed: NamedCallStateComputed<Prop> & WithAllEntitiesStateComputed;
    methods: {
      getAllWithKeys: <Z extends Entity>(param: (keyof Z)[]) => void;
      allGetById: (id: number) => Partial<E>;
    };
  }
>;

export function withEntitiesAllService<
  E extends Entity,
  S extends EntitiesAllService<E>
>(dataServiceType: Type<S>, prop: string): SignalStoreFeature {
  return signalStoreFeature(
    withState<{ allWithKeys: Partial<E>[] }>(() => ({
      allWithKeys: [],
    })),
    withCallStateService({ prop }),
    withComputed((store) => ({
      entitiesAll: computed(() => {
        return store.allWithKeys();
      }),
    })),
    withMethods((store) => {
      const dataService = inject(dataServiceType);
      return {
        allGetById(id: number) {
          return store.allWithKeys().find((c) => c.id === id);
        },
        getAllWithKeys: rxMethod<(keyof E)[]>(
          pipe(
            switchMap((params) => {
              console.log(params);
              patchState(store, setLoading(prop));
              return dataService.getAllWithKeys(params).pipe(
                delay(100),
                tapResponse({
                  next: (entities) => {
                    patchState(store, setLoaded(prop));
                    patchState(store, { allWithKeys: entities });
                  },
                  error: (e) => console.log(e),
                })
              );
            })
          )
        ),
      };
    })
  );
}
