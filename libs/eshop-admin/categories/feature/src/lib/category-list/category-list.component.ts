import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  CATEGORIES_TABLE_COLUMNS_CONFIG,
  Category,
  CategoryStore,
} from '@nx-suite/eshop-admin/categories/domain';
import { HeaderNavigationStore } from '@nx-suite/eshop-admin/shared/domain';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiLoaderComponent,
  NxSuiteUiTableComponent,
  NxSuiteUiTableItemContext,
  NxSuiteUiTableItemContextDirective,
  NxSuiteUiTableItemDirective,
  NxSuiteUiTableItemTemplateContext,
} from '@nx-suite/shared/ui';
import { Pagination, Sort } from '@nx-suite/shared/util';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NxSuiteUiTableComponent,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
    NxSuiteUiTableItemContextDirective,
    NxSuiteUiTableItemDirective,
    RouterLink,
  ],
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class EshopAdminCategoryListComponent implements OnInit {
  protected readonly tableItemTemplate = viewChild<
    NxSuiteUiTableItemDirective<NxSuiteUiTableItemTemplateContext<Category>>
  >(NxSuiteUiTableItemDirective<NxSuiteUiTableItemTemplateContext<Category>>);

  protected readonly categoryStore = inject(CategoryStore);
  protected readonly columnsConfig = inject(CATEGORIES_TABLE_COLUMNS_CONFIG);
  readonly #headerNavigationStore = inject(HeaderNavigationStore);
  readonly #router = inject(Router);

  ngOnInit(): void {
    this.setTitle();
  }

  public updateFilter(): void {
    this.categoryStore.updateFilter({ name: 'a' });
  }

  public editCategory(context: NxSuiteUiTableItemContext<Category>): void {
    this.#router.navigateByUrl(`/categories/${context.item.id}`);
  }

  public onPaginationChange(data: Pagination): void {
    this.categoryStore.updatePagination(data);
  }

  public onSortChange(data: Sort<Category>): void {
    this.categoryStore.updateSort(data);
  }

  private setTitle(): void {
    this.#headerNavigationStore.setTitle('Categories List');
  }
}
