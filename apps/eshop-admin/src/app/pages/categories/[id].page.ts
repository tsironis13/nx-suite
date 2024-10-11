import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EshopAdminCategoryEditComponent } from '@nx-suite/eshop-admin/categories/feature';

@Component({
  selector: 'eshop-admin-categories-edit',
  standalone: true,
  imports: [EshopAdminCategoryEditComponent],
  template: `<eshop-admin-category-edit [id]="this.id()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryEditPageComponent {
  protected readonly id = input.required<number>();
}
