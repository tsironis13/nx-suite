import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { FormGroup } from '@angular/forms';
import { signalStore, withHooks, withMethods } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  withDataService,
  withEntitiesAllService,
  withFormStateService,
} from '@nx-suite/shared/util';
import { filter, pipe, tap } from 'rxjs';
import { Category, CategoryForm } from '../entities';
import { CategoryService } from '../infrastructure';

export const withCategoriesAllService = withEntitiesAllService<
  Category,
  CategoryService,
  'categoriesAll'
>(CategoryService, 'categoriesAll');

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withDevtools('categories'),
  withCategoriesAllService,
  withEntities<Category>(),
  withFormStateService<CategoryForm>(new FormGroup({})),
  withDataService(CategoryService, { name: '' }),
  withMethods((store) => {
    return {
      onCategoryCreated: rxMethod<boolean>(
        pipe(
          filter((x) => x),
          tap(() => {
            store.getAllWithKeys<Category>(['id', 'name']);
            store.updateSort({ sortBy: 'id', sortOrder: 1 });
          })
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.getByFilterAndPagination(store.entityFilterParams);
    },
  })
);
