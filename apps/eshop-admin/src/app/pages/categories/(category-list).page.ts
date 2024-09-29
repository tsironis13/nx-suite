import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EshopAdminCategoryListComponent } from '@nx-suite/eshop-admin/categories/feature-category-list';

@Component({
  selector: 'eshop-admin-categories-list',
  standalone: true,
  imports: [AsyncPipe, EshopAdminCategoryListComponent],
  template: `
    <h2>Categories List</h2>

    <!-- @for (item of productCategories$ | async; track $index) {
    <div>{{ item.id }}</div>
    <div>{{ item.name }}</div>
    }

    <br />

    @for (item of productCategoriesQuery$ | async; track $index) {
    <div>{{ item.id }}</div>
    <div>{{ item.name }}</div>
    } -->

    <br />
    <br />
    <eshop-admin-category-list />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryListPageComponent {
  //private _trpc = injectTrpcClient();

  // public productCategories$ = this._trpc.productCategories.list.query();
  // public productCategoriesQuery$ = this._trpc.productCategories.getByName.query(
  //   {
  //     name: 'dfghfgh',
  //   }
  // );

  constructor() {
    console.log('hello');
  }
}
