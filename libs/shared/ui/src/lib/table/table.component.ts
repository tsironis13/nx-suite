import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
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
import { BehaviorSubject } from 'rxjs';

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
export class NxSuiteUiTableComponent<T> implements TableComponent<T> {
  public readonly size = input.required<TableSize>();
  public readonly columns = input.required<TableColumnType<T>[]>();
  public readonly data = input.required<T[]>();
  public readonly contextMenu = input<any>();

  protected readonly sorter$ = new BehaviorSubject<any>('name');

  protected columns1 = ['id', 'name', 'description', 't'];

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
