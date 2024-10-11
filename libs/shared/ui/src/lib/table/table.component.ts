import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Entity,
  Pagination,
  Sort,
  TableColumnType,
  TableSize,
  ToStringPipe,
} from '@nx-suite/shared/util';
import {
  TuiReorder,
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import { TuiLet } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiLoader } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import {
  combineLatest,
  debounceTime,
  ReplaySubject,
  share,
  skip,
  tap,
} from 'rxjs';
import {
  NxSuiteUiTableItemDirective,
  NxSuiteUiTableItemTemplateContext,
} from './directives';

interface TableComponent<T> {
  size: InputSignal<TableSize>;
  columns: InputSignal<TableColumnType<T>[]>;
  data: InputSignal<T[]>;
  totalCount: InputSignal<number>;
  pagination: InputSignal<Pagination>;
  sortOrder: InputSignal<Sort<T>>;
  contextMenu: InputSignal<
    | NxSuiteUiTableItemDirective<NxSuiteUiTableItemTemplateContext<T>>
    | undefined
  >;
}

@Component({
  selector: 'nx-suite-ui-table',
  standalone: true,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    TuiTablePagination,
    TuiLet,
    TuiReorder,
    TuiTable,
    ToStringPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLoader,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiTableComponent<T extends Entity>
  implements TableComponent<T>, AfterViewInit
{
  public readonly size = input.required<TableSize>();
  public readonly columns = input.required<TableColumnType<T>[]>();
  public readonly data = input.required<T[]>();
  public readonly totalCount = input.required<number>();
  public readonly pagination = input.required<Pagination>();
  public readonly sortOrder = input.required<Sort<T>>();
  public readonly contextMenu =
    input<NxSuiteUiTableItemDirective<NxSuiteUiTableItemTemplateContext<T>>>();

  public onPaginationChange = output<Pagination>();
  public onSortChange = output<Sort<T>>();

  protected readonly mappedColumns = computed(() =>
    this.columns().map((i) => i.field)
  );

  readonly #direction$ = new ReplaySubject<-1 | 1>();
  readonly #sorter$ = new ReplaySubject<keyof T>();
  readonly #_ = combineLatest([this.#sorter$, this.#direction$])
    .pipe(
      debounceTime(0),
      skip(1),
      takeUntilDestroyed(),
      share(),
      tap((sort) => this.onSort({ sortBy: sort[0], sortOrder: sort[1] }))
    )
    .subscribe();

  ngAfterViewInit(): void {
    this.initSorting();
  }

  protected onSort(sort: Sort<T>): void {
    this.onSortChange.emit(sort);
  }

  protected onSortOrder(key: string | number | symbol | null): void {
    this.#sorter$.next(key as keyof T);
  }

  protected onDirection(direction: 1 | -1): void {
    this.#direction$.next(direction);
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.onPaginationChange.emit({ pageNumber: page + 1, pageSize: size });
  }

  private initSorting(): void {
    this.#sorter$.next(this.sortOrder().sortBy);
    this.#direction$.next(this.sortOrder().sortOrder);
  }
}
