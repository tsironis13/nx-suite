import { Injectable } from '@angular/core';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import { DataService, EntityFilterData, Filter } from '@nx-suite/shared/util';
import { Observable } from 'rxjs';
import { Category } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements DataService<Category, Filter> {
  readonly #trpc = injectTrpcClient();

  // public productCategories$ = this._trpc.productCategories.list.query();

  load(params: EntityFilterData<Category, Filter>): Observable<Category[]> {
    // console.log(pagination);
    console.log('load');
    console.log(params);
    const x = this.#trpc.productCategory.getPaginated.query({
      pagination: params.pagination,
      sort: params.sort,
    }) as Observable<Category[]>;
    // const x = this._trpc.productCategory.getPaginated
    //   .query({ pageSize: pagination.pageSize })
    //   .toPromise() as any;
    //return new Promise([] as any);

    //console.log(x.then((y) => console.log(y)));

    return x;
  }
}
