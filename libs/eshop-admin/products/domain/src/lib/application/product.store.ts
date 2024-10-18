import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { withCrudDataService, withFormService } from '@nx-suite/shared/domain';
import { Product } from '../entities';
import { ProductService } from '../infrastructure';

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withDevtools('products'),
  withEntities<Product>(),
  withFormService({} as any),
  withCrudDataService(ProductService, { pageSize: 10, pageNumber: 1 }),
  withMethods((store) => ({
    addTodo(todo: Product): void {
      patchState(store, addEntity(todo));
    },
  })),
  withHooks({
    onInit(store) {
      console.log('on init products list store');
      //store.load(store.entityFilterParams);
    },
  })
);
