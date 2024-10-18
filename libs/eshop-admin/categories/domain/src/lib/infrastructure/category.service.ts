import { Injectable } from '@angular/core';
import { CrudDataService, EntitiesService } from '@nx-suite/shared/domain';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import {
  EntitiesPagination,
  EntityFilterData,
  Filter,
} from '@nx-suite/shared/util';
import { Observable } from 'rxjs';
import { Category, CategoryForm } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class CategoryService
  implements
    CrudDataService<Category, Filter, CategoryForm>,
    EntitiesService<Category>
{
  readonly #trpc = injectTrpcClient();

  getByFilterAndPagination(
    params: EntityFilterData<Category, Filter>
  ): Observable<EntitiesPagination<Category>> {
    return this.#trpc.productCategory.getPaginated.query({
      pagination: params.pagination,
      sort: params.sort,
    }) as Observable<EntitiesPagination<Category>>;
  }

  getAllWithKeys(
    keysToReturn: (keyof Category)[]
  ): Observable<Partial<Category>[]> {
    return this.#trpc.productCategory.list.query(keysToReturn) as Observable<
      Partial<Category>[]
    >;
  }

  create(params: CategoryForm): Observable<Partial<Category>[]> {
    return this.#trpc.productCategory.create.mutate(params) as Observable<
      Partial<Category>[]
    >;
  }

  getById(id: number): Observable<Partial<Category>[]> {
    return this.#trpc.productCategory.getById.query(id) as Observable<
      Partial<Category>[]
    >;
  }
}
