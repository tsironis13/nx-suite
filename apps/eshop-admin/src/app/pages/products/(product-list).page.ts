import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EshopAdminProductListComponent } from '@nx-suite/eshop-admin/products/feature-product-list';

@Component({
  selector: 'eshop-admin-products-list',
  standalone: true,
  template: ` <h2>Products List</h2>
    <eshop-admin-product-list />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EshopAdminProductListComponent],
})
export default class ProductListPageComponent {}
