import { InjectionToken } from '@angular/core';
import { TableColumnType } from '@nx-suite/shared/util';
import { Category } from '../entities';

export const CATEGORIES_TABLE_COLUMNS_CONFIG = new InjectionToken<
  TableColumnType<Category>[]
>('categories_table_columns_config', {
  providedIn: 'root',
  factory: () => {
    return [
      { field: 'id', header: 'id', metaData: { disableSort: false } },
      { field: 'name', header: 'name', metaData: { disableSort: false } },
      {
        field: 'description',
        header: 'desc',
        metaData: { disableSort: false },
      },
      {
        field: 'parentCategoryName',
        header: 'parent category',
        metaData: { disableSort: true },
      },
      {
        field: '' as any,
        header: '',
        metaData: { type: 'contextMenu', disableSort: true },
      },
    ];
  },
});
