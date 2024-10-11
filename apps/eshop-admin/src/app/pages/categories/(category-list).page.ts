import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EshopAdminCategoryListComponent } from '@nx-suite/eshop-admin/categories/feature';

@Component({
  selector: 'eshop-admin-categories-list',
  standalone: true,
  imports: [EshopAdminCategoryListComponent],
  template: ` <eshop-admin-category-list /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryListPageComponent {}
