import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CaptionLink, urlToCaption } from '@nx-suite/shared/util';
import { filter, Observable, pipe, tap } from 'rxjs';

export const HeaderNavigationStore = signalStore(
  withDevtools('header-navigation'),
  withState(() => ({
    title: '',
    captionLinks: Array<CaptionLink>(),
  })),
  withComputed((store) => ({
    headerTitle: computed(() => store.title()),
    headerCaptionLinks: computed(() => store.captionLinks()),
  })),
  withMethods((store) => {
    return {
      setTitle(title: string) {
        patchState(store, { title });
      },
      onRouterEvents: rxMethod<Observable<Event>>(
        pipe(
          filter((e) => e instanceof NavigationStart),
          tap((e) => {
            const captionLinks = urlToCaption(e.url, 'dashboard');
            patchState(store, { captionLinks });
          })
        )
      ),
    };
  }),
  withHooks({
    onInit(store, router = inject(Router)) {
      store.onRouterEvents(router.events);
    },
  })
);
