import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { withDataService } from '@nx-suite/shared/util';
import { Product } from '../entities';
import { ProductService } from '../infrastructure';

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withDevtools('products'),
  withEntities<Product>(),
  withDataService(
    ProductService,
    { pageSize: 10, pageNumber: 1 },
    { name: 't' }
  ),
  withMethods((store) => ({
    addTodo(todo: Product): void {
      patchState(store, addEntity(todo));
    },
  })),
  withHooks({
    onInit(store) {
      console.log('on init products list store');
      store.loadAll(store.onAllChange);
    },
  })
);
