import { Injectable } from '@angular/core';
import { CrudDataService } from '@nx-suite/shared/domain';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import { Pagination } from '@nx-suite/shared/util';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService
  implements CrudDataService<Product, Pagination, { id: 1 }>
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

  create(params: any): any {
    return null;
  }

  getById(id: number): any {
    return null;
  }
}
