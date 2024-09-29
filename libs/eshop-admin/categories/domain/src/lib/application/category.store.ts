import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withHooks } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withDataService } from '@nx-suite/shared/util';
import { Category } from '../entities';
import { CategoryService } from '../infrastructure';

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withDevtools('categories'),
  withEntities<Category>(),
  withDataService(CategoryService, { name: '' }),
  withHooks({
    onInit(store) {
      store.load(store.entityFilterParams);
    },
  })
);
