import { Injectable } from '@angular/core';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import {
  DataService,
  EntitiesPagination,
  Pagination,
} from '@nx-suite/shared/util';
import { Observable } from 'rxjs';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService
  implements DataService<Product, Pagination, { id: 1 }>
{
  readonly #trpc = injectTrpcClient();

  test(params: any): Observable<EntitiesPagination<Product>> {
    return null as any;
  }
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
