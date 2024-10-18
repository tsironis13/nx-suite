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
import { Entity } from '@nx-suite/shared/util';
import { delay, Observable, pipe, switchMap } from 'rxjs';
import {
  NamedCallStateComputed,
  setLoaded,
  setLoading,
  withCallStateService,
} from './call-state.feature';

type WithAllEntitiesStateComputed = {
  entitiesAll: Signal<Entity[]>;
};

export interface EntitiesService<E extends Entity> {
  getAllWithKeys(params: (keyof E)[]): Observable<Partial<E>[]>;
}

/**
 * Signal Store feature to fetch all entities data
 * for dropdown manipulation **To be revised if needed**
 * @param dataServiceType
 * @param prop
 */
export function withEntitiesService<
  E extends Entity,
  S extends EntitiesService<E>,
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
    };
  }
>;

export function withEntitiesService<
  E extends Entity,
  S extends EntitiesService<E>
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
        getAllWithKeys: rxMethod<(keyof E)[]>(
          pipe(
            switchMap((params) => {
              console.log(params);
              patchState(store, setLoading(prop));
              return dataService.getAllWithKeys(params).pipe(
                delay(100),
                tapResponse({
                  next: (entities) => {
                    patchState(
                      store,
                      { allWithKeys: entities },
                      setLoaded(prop)
                    );
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
