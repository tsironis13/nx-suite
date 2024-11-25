import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Category,
  CategoryStore,
  provideCategoriesTableColumnsConfig,
} from '@nx-suite/eshop-admin/categories/domain';
import { HeaderNavigationStore } from '@nx-suite/eshop-admin/shared/domain';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiLoaderComponent,
  NxSuiteUiTableComponent,
  NxSuiteUiTableContextMenuTemplateDirective,
  NxSuiteUiTableItemContext,
  NxSuiteUiTableItemContextDirective,
  NxSuiteUiTableItemTemplateContext,
} from '@nx-suite/shared/ui';
import { Pagination, Sort, TableColumnType } from '@nx-suite/shared/util';
import { EshopAdminTableColumnImageTemplateDirective } from './directives/table/image-template.directive';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NxSuiteUiTableComponent,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
    NxSuiteUiTableItemContextDirective,
    NxSuiteUiTableContextMenuTemplateDirective,
    EshopAdminTableColumnImageTemplateDirective,
    RouterLink,
  ],
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class EshopAdminCategoryListComponent implements OnInit {
  protected readonly tableContextMenuTemplate = viewChild<
    NxSuiteUiTableContextMenuTemplateDirective<
      NxSuiteUiTableItemTemplateContext<Category>
    >
  >(NxSuiteUiTableContextMenuTemplateDirective<Category>);
  protected readonly tableImageColumnTemplate = viewChild<
    EshopAdminTableColumnImageTemplateDirective<Category>
  >(EshopAdminTableColumnImageTemplateDirective<Category>);

  protected readonly categoryStore = inject(CategoryStore);
  readonly #headerNavigationStore = inject(HeaderNavigationStore);
  readonly #router = inject(Router);
  readonly #injector = inject(Injector);

  protected columnsConfig: WritableSignal<TableColumnType<Category>[]> = signal(
    []
  );

  ngOnInit(): void {
    this.setTitle();
    this.initTable();
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

  private initTable(): void {
    runInInjectionContext(this.#injector, () => {
      this.columnsConfig.set(
        inject(
          provideCategoriesTableColumnsConfig(
            this.tableImageColumnTemplate()?.templateRef
          )
        )
      );
    });
  }
}
