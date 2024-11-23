import { InjectionToken, TemplateRef } from '@angular/core';
import { TableColumnType } from '@nx-suite/shared/util';
import { Category } from '../entities';

export function provideCategoriesTableColumnsConfig(
  imageTemplate: TemplateRef<Category>
) {
  return new InjectionToken<TableColumnType<Category>[]>(
    'categories_table_columns_config',
    {
      providedIn: 'root',
      factory: () => {
        return [
          { field: 'id', header: 'id', metaData: { disableSort: false } },
          {
            field: 'imageUrl',
            header: 'image',
            metaData: { type: 'template', disableSort: true },
            template: imageTemplate,
          },
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
    }
  );
}
