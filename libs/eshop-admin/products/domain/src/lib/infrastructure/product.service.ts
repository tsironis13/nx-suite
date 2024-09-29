import { Injectable } from '@angular/core';
import { injectTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import { DataService, Pagination } from '@nx-suite/shared/util';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements DataService<Product, Pagination> {
  readonly #trpc = injectTrpcClient();

  // public productCategories$ = this._trpc.productCategories.list.query();

  load(pagination: Pagination): Promise<Product[]> {
    // console.log(pagination);

    const x = this.#trpc.product.getPaginated
      .query({ pageSize: pagination.pageSize })
      .toPromise() as any;
    return x;
    //console.log(x);
    //x.subscribe((x1) => console.log(x1));
    return;
  }
}
