import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core';
import {
  TableColumnType,
  TableSize,
  ToStringPipe,
} from '@nx-suite/shared/util';
import {
  TuiTable,
  TuiTablePagination,
  TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import { TuiLet } from '@taiga-ui/cdk';

interface TableComponent<T> {
  size: InputSignal<TableSize>;
  columns: InputSignal<TableColumnType<T>[]>;
  data: InputSignal<T[]>;
  contextMenu: InputSignal<TemplateRef<any>>;
}

@Component({
  selector: 'nx-suite-ui-table',
  standalone: true,
  imports: [
    TuiTable,
    NgTemplateOutlet,
    TuiTablePagination,
    TuiLet,
    ToStringPipe,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSuiteUiTableComponent<T> implements TableComponent<T> {
  public readonly size = input.required<TableSize>();
  public readonly columns = input.required<TableColumnType<T>[]>();
  public readonly data = input.required<T[]>();
  public readonly contextMenu = input<any>();

  protected readonly mappedColumns = computed(() =>
    this.columns().map((i) => i.field)
  );

  protected page = 3;
  protected size1 = 10;

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page = page;
    this.size1 = size;
  }
}
