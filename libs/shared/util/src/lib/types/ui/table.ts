export type TableSize = 'l' | 'm' | 's';

export type TableColumnType<T> = {
  field: keyof T;
  header: string;
  metaData?: TableColumnMetaData;
};

export type TableColumnMetaData = {
  format?: string;
  type?: 'date' | 'dateUtc' | 'number' | 'template' | 'contextMenu';
  disableSort?: boolean;
  defaultSort?: 'asc' | 'desc';
};
