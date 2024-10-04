import { Injectable } from '@angular/core';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import {
  DataService,
  EntitiesAllService,
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
    DataService<Category, Filter, CategoryForm>,
    EntitiesAllService<Category>
{
  readonly #trpc = injectTrpcClient();

  getByFilterAndPagination(
    params: EntityFilterData<Category, Filter>
  ): Observable<Category[]> {
    console.log(params);
    return this.#trpc.productCategory.getPaginated.query({
      pagination: params.pagination,
      sort: params.sort,
    });
  }

  getAllWithKeys(
    keysToReturn: (keyof Category)[]
  ): Observable<Partial<Category>[]> {
    return this.#trpc.productCategory.list.query(keysToReturn);
  }

  create(params: CategoryForm): Observable<Partial<Category>[]> {
    return this.#trpc.productCategory.create.mutate(params);
  }
}
