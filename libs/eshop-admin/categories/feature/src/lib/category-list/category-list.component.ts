import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryStore } from '@nx-suite/eshop-admin/categories/domain';
import { HeaderNavigationStore } from '@nx-suite/eshop-admin/shared/domain';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiTableComponent,
} from '@nx-suite/shared/ui';
import { TuiTablePaginationEvent } from '@taiga-ui/addon-table';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NxSuiteUiTableComponent,
    NxSuiteUiButtonComponent,
    RouterLink,
  ],
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class EshopAdminCategoryListComponent implements OnInit {
  protected readonly categoryStore = inject(CategoryStore);
  readonly #headerNavigationStore = inject(HeaderNavigationStore);

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

  // x = new FormGroup({
  //   //id: new FormControl(1),
  //   name: new FormControl(''),
  // });
  x = this.categoryStore.formGroup();

  constructor() {
    this.categoryStore.syncForm(this.x.valueChanges);
  }

  ngOnInit(): void {
    this.setTitle();
  }

  updateForm() {
    //this.categoryStore.create();
    this.x.patchValue({
      //a1: 'a1',
      name: 'df1',
    });
  }

  create() {
    this.categoryStore.create();
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

  private setTitle() {
    this.#headerNavigationStore.setTitle('Categories List');
  }
}
