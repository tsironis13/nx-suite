import { computed } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { FormGroupMap } from '../types';

export function withFormStateService<E extends Record<string, unknown>>(
  fg: FormGroup<FormGroupMap<E>> | FormGroup<Record<never, never>>
) {
  return signalStoreFeature(
    withState<{ form: Partial<E> }>(() => ({
      form: {},
    })),
    withComputed(() => ({
      formGroup: computed(() => fg),
    })),
    withMethods((store) => {
      return {
        syncForm: rxMethod<Partial<E>>(
          pipe(tap((form) => patchState(store, { form })))
        ),
      };
    })
  );
}
