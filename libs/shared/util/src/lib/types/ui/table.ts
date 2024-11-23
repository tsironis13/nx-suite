import { TemplateRef } from '@angular/core';

export type TableSize = 'l' | 'm' | 's';

export type TableColumnType<T> = {
  field: keyof T;
  header: string;
  metaData?: TableColumnMetaData;
  template?: TemplateRef<T>;
};

export type TableColumnType1<T> = {
  field: keyof T;
  header: string;
  metaData?: TableColumnMetaData;
  template: TableColumnMetaData extends 'template'
    ? [TemplateRef<T>]
    : [undefined?];
};

export type TableColumnMetaData = {
  format?: string;
  type?: 'date' | 'dateUtc' | 'number' | 'template' | 'contextMenu';
  disableSort?: boolean;
  defaultSort?: 'asc' | 'desc';
};
