import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductStore } from '@nx-suite/eshop-admin/products/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'eshop-admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EshopAdminProductListComponent {
  protected readonly listStore = inject(ProductStore);

  constructor() {
    //effect(() => console.log(this.listStore.testFiltering()));
  }

  updatePagination() {
    this.listStore.updatePagination({ pageNumber: 1, pageSize: 1 });
    //this.listStore.loadAll({ pageNumber: 1, pageSize: 1 });
  }

  updateFilter() {
    this.listStore.updateFilter({ name: 'a' });
  }
}
