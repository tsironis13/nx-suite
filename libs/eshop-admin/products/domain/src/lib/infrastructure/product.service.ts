import { Injectable } from '@angular/core';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import { DataService, Pagination } from '@nx-suite/shared/util';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService
  implements DataService<Product, Pagination, { id: 1 }>
{
  readonly #trpc = injectTrpcClient();

  // public productCategories$ = this._trpc.productCategories.list.query();

  getByFilterAndPagination(params: any): any {
    // console.log(pagination);

    const x = this.#trpc.product.getPaginated
      .query({ pageSize: params.pagination.pageSize })
      .toPromise() as any;
    return x;
    //console.log(x);
    //x.subscribe((x1) => console.log(x1));
    return;
  }

  create(params: any) {
    return null;
  }
}
