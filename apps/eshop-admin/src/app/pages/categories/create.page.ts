import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EshopAdminCategoryCreateComponent } from '@nx-suite/eshop-admin/categories/feature';

@Component({
  selector: 'eshop-admin-categories-create',
  standalone: true,
  imports: [EshopAdminCategoryCreateComponent],
  template: `<eshop-admin-category-create />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryCreatePageComponent {}
