import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { ViewportScroller } from '@angular/common';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, Observable, of, pipe, switchMap, tap } from 'rxjs';

type ScrollingState = {
  currentPageOffset: number;
  scrollingInProgress: boolean;
  componentsOffsetTopOffsetHeightBoundaries: ComponentOffsetTop;
};

type ComponentOffsetTop = {
  [K in AnchorItem]?: [number, number];
};

type AnchorItem = 'home' | 'about' | 'projects' | 'experience' | 'techStack';

type MenuItem = {
  title: string;
  anchor: AnchorItem;
  scrollOffset: number;
};

const menuItems: MenuItem[] = [
  { title: 'Home', anchor: 'home', scrollOffset: 0 },
  { title: 'About', anchor: 'about', scrollOffset: 75 },
  { title: 'Works', anchor: 'projects', scrollOffset: 75 },
  { title: 'Experience', anchor: 'experience', scrollOffset: 75 },
  { title: 'Tech Stack', anchor: 'techStack', scrollOffset: 75 },
];

const scrollingState: ScrollingState = {
  currentPageOffset: 0,
  scrollingInProgress: false,
  componentsOffsetTopOffsetHeightBoundaries: {
    home: [0, 0],
    about: [0, 0],
    projects: [0, 0],
    experience: [0, 0],
    techStack: [0, 0],
  },
};

export const HeaderNavigationStore = signalStore(
  { providedIn: 'root' },
  withDevtools('header-navigation'),
  withState(() => ({
    isHeaderSticky: false,
    scrollingState,
    menuItems: menuItems.map((el, index) => ({
      ...el,
      id: index + 1,
      active: false,
    })),
  })),
  withComputed((store) => ({
    getActiveMenuItem: computed(() => store.menuItems().find((i) => i.active)),
  })),
  withMethods((store, viewportScroller = inject(ViewportScroller)) => {
    function updateActiveItemById(id: number) {
      patchState(store, {
        menuItems: store.menuItems().map((i) => {
          return {
            ...i,
            active: i.id === id,
          };
        }),
      });
    }

    function updateActiveItemByAnchor(anchor: AnchorItem) {
      patchState(store, {
        menuItems: store.menuItems().map((i) => {
          return {
            ...i,
            active: i.anchor === anchor,
          };
        }),
      });
    }

    function scrollToAnchorById(id: number, offset = 0) {
      if (offset > 0) {
        viewportScroller.setOffset([0, offset]);
      }

      if (store.scrollingState().scrollingInProgress) {
        return;
      }

      updateActiveItemById(id);

      patchState(store, {
        scrollingState: {
          ...store.scrollingState(),
          scrollingInProgress: true,
        },
      });

      viewportScroller.scrollToAnchor(
        store.getActiveMenuItem()?.anchor as string
      );

      setTimeout(
        () =>
          patchState(store, {
            scrollingState: {
              ...store.scrollingState(),
              scrollingInProgress: false,
            },
          }),
        500
      );
    }

    function enableStickyHeader() {
      patchState(store, { isHeaderSticky: window.scrollY > 0 });
    }

    function updateComponentOffsetTop(
      key: keyof ComponentOffsetTop,
      offsetTopOffsetHeight: [number, number]
    ) {
      patchState(store, {
        scrollingState: {
          ...scrollingState,
          componentsOffsetTopOffsetHeightBoundaries: {
            ...store.scrollingState().componentsOffsetTopOffsetHeightBoundaries,
            [key]: offsetTopOffsetHeight,
          },
        },
      });
    }

    const updateActiveItemOnPageScroll = rxMethod<number>(
      pipe(
        switchMap((pageScroll) => {
          const toolbarHeight = 75; //TODO check
          const scrollableContent = Object.entries(
            store.scrollingState().componentsOffsetTopOffsetHeightBoundaries
          ).filter(
            ([, offsetBoundaries]) =>
              pageScroll + toolbarHeight >= offsetBoundaries[0] &&
              pageScroll + toolbarHeight <
                offsetBoundaries[0] + offsetBoundaries[1]
          );

          return of(
            scrollableContent[0] ? scrollableContent[0][0] : null
          ) as Observable<AnchorItem>;
        }),
        filter(
          (scrollableContent) =>
            scrollableContent !== null &&
            !store.scrollingState().scrollingInProgress
        ),
        tap((anchor) => {
          updateActiveItemByAnchor(anchor);
        })
      )
    );
    return {
      updateActiveItemById,
      scrollToAnchorById,
      enableStickyHeader,
      updateComponentOffsetTop,
      updateActiveItemOnPageScroll,
    };
  }),
  withHooks({
    onInit(store) {
      store.updateActiveItemById(1);
    },
  })
);
