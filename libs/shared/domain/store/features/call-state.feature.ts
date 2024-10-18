import { computed, Signal } from '@angular/core';
import {
  SignalStoreFeature,
  signalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export type CallStateSlice = {
  callState: CallState;
};

export type NamedCallStateSlice<Prop extends string> = {
  [K in Prop as `${K}CallState`]: CallState;
};

export type NamedCallStateComputed<Prop extends string> = {
  [K in Prop as `${K}Loading`]: Signal<boolean>;
} & { [K in Prop as `${K}Loaded`]: Signal<boolean> } & {
  [K in Prop as `${K}Error`]: Signal<string | null>;
};

export function getCallStateKeys(config?: { prop?: string }) {
  const prop = config?.prop;
  return {
    callStateKey: prop ? `${config.prop}CallState` : 'callState',
    loadingKey: prop ? `${config.prop}Loading` : 'loading',
    loadedKey: prop ? `${config.prop}Loaded` : 'loaded',
    errorKey: prop ? `${config.prop}Error` : 'error',
  };
}

//Overloading with External View
export function withCallStateService<Prop extends string>(config: {
  prop: Prop;
}): SignalStoreFeature<
  {
    state: Record<never, never>;
    computed: Record<never, never>;
    methods: Record<never, never>;
  },
  {
    state: NamedCallStateSlice<Prop>;
    computed: NamedCallStateComputed<Prop>;
    methods: Record<never, never>;
  }
>;

//Implementation with Internal View
export function withCallStateService<Prop extends string>(config: {
  prop: Prop;
}): SignalStoreFeature {
  const { callStateKey, errorKey, loadingKey, loadedKey } =
    getCallStateKeys(config);
  return signalStoreFeature(
    withState({ [callStateKey]: 'init' }),
    withComputed((state: Record<string, Signal<unknown>>) => {
      const callState = state[callStateKey] as Signal<CallState>;

      return {
        [loadingKey]: computed(() => callState() === 'loading'),
        [loadedKey]: computed(() => callState() === 'loaded'),
        [errorKey]: computed(() => {
          const v = callState();
          return typeof v === 'object' ? v.error : null;
        }),
      };
    })
  );
}

export function setLoading<Prop extends string>(
  prop: Prop
): NamedCallStateSlice<Prop> {
  return { [`${prop}CallState`]: 'loading' } as NamedCallStateSlice<Prop>;
}

export function setLoaded<Prop extends string>(
  prop: Prop
): NamedCallStateSlice<Prop> {
  return { [`${prop}CallState`]: 'loaded' } as NamedCallStateSlice<Prop>;
}

export function setError<Prop extends string>(
  error: string,
  prop?: Prop
): NamedCallStateSlice<Prop> | CallStateSlice {
  if (prop) {
    return { [`${prop}CallState`]: { error } } as NamedCallStateSlice<Prop>;
  } else {
    return { callState: { error } };
  }
}
