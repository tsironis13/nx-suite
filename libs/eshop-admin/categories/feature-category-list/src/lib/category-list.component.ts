import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryStore } from '@nx-suite/eshop-admin/categories/domain';
import {
  NxSuiteUiSelectComponent,
  NxSuiteUiTableComponent,
} from '@nx-suite/shared/ui';
import { TuiTable, TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import {
  TuiAutoColorPipe,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';

type Card = {
  id: number;
  cardName: string;
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiCell,
    TuiTable,
    TuiCheckbox,
    TuiProgressBar,
    TuiBadge,
    TuiStatus,
    TuiItemsWithMore,
    TuiChip,
    TuiIcon,
    TuiAvatar,
    TuiDropdown,
    TuiAutoColorPipe,
    TuiInitialsPipe,
    NxSuiteUiTableComponent,
    NxSuiteUiSelectComponent,
  ],
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class EshopAdminCategoryListComponent {
  // protected readonly headerTemplate = viewChild.required<
  //   TableHeaderDirective<unknown>
  // >(TableHeaderDirective<unknown>);
  // protected readonly bodyTemplate = viewChild.required<
  //   TableBodyDirective<unknown>
  // >(TableBodyDirective<unknown>);

  protected readonly categoryStore = inject(CategoryStore);
  protected readonly validators = Validators.required;
  fb = inject(FormBuilder);

  form = this.fb.group({});

  protected cards: Card[] = [
    {
      id: 1,
      cardName: 'Bitcoin',
    },
    {
      id: 2,
      cardName: 'Bitcoin2',
    },
    {
      id: 3,
      cardName: 'Bitcoin3',
    },
    {
      id: 4,
      cardName: 'Bitcoin3',
    },
    {
      id: 5,
      cardName: 'Bitcoin3',
    },
    {
      id: 6,
      cardName: 'Bitcoin3',
    },
    {
      id: 7,
      cardName: 'Bitcoin3',
    },
    {
      id: 8,
      cardName: 'Bitcoin3',
    },
    {
      id: 9,
      cardName: 'Bitcoin3',
    },
    {
      id: 10,
      cardName: 'Bitcoin3',
    },
    {
      id: 11,
      cardName: 'Bitcoin3',
    },
    {
      id: 12,
      cardName: 'Bitcoin3',
    },
  ];

  protected page = 3;
  protected size1 = 10;

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page = page;
    this.size1 = size;
  }

  protected length = 64;

  protected index = 10;

  protected goToPage(index: number): void {
    this.index = index;
    console.info('New page:', index);
  }

  constructor() {
    //effect(() => console.log(this.listStore.testFiltering()));
    //this.categoryStore.
    this.form.valueChanges.subscribe((x) => console.log(x));
  }

  protected readonly data = [
    {
      checkbox: {
        title: 'Data point 1',
        subtitle: 'The first element',
      },
      title: {
        icon: '@tui.file',
        title: 'This is title',
        chip: 'Chip',
        subtitle: 'More information ・ Data',
      },
      cell: {
        name: 'John Cleese',
        email: 'silly@walk.uk',
      },
      status: {
        value: 'Success',
        color: 'var(--tui-status-positive)',
      },
      items: ['Some', 'items', 'displayed', 'here', 'and', 'can', 'overflow'],
      progress: 78,
      selected: false,
    },
    {
      checkbox: {
        title: 'Some title',
        subtitle: 'Some more text',
      },
      title: {
        icon: '@tui.heart',
        title: 'More info',
        chip: 'Chips can be here',
      },
      cell: {
        name: 'Eric Idle',
        email: 'cool@dude.com',
      },
      status: {
        value: 'Failure',
        color: 'var(--tui-status-negative)',
      },
      items: ['One', 'Item'],
      progress: 91,
      selected: false,
    },
    {
      checkbox: {
        title: 'And now',
        subtitle: 'Completely different',
      },
      title: {
        icon: '@tui.star',
        title: 'Wow',
      },
      cell: {
        name: 'Michael Palin',
        email: 'its@man.com',
      },
      status: {
        value: 'Pending',
        color: 'var(--tui-status-warning)',
      },
      items: [],
      progress: 32,
      selected: false,
    },
  ];

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);

    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data.forEach((item) => {
      item.selected = checked;
    });
  }

  updatePagination() {
    this.categoryStore.updatePagination({ pageNumber: 1, pageSize: 1 });
    //this.listStore.loadAll({ pageNumber: 1, pageSize: 1 });
  }

  updateFilter() {
    this.categoryStore.updateFilter({ name: 'a' });
  }
}
