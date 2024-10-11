import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderNavigationStore } from '@nx-suite/domain';
import {
  Category,
  CategoryForm,
  CategoryStore,
} from '@nx-suite/eshop-admin/categories/domain';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiInputComponent,
  NxSuiteUiLoaderComponent,
  NxSuiteUiSelectComponent,
} from '@nx-suite/shared/ui';
import { FormGroupMap } from '@nx-suite/shared/util';

@Component({
  standalone: true,
  imports: [
    NxSuiteUiSelectComponent,
    NxSuiteUiInputComponent,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
    ReactiveFormsModule,
  ],
  selector: 'eshop-admin-category-create-edit-shared',
  templateUrl: './create-edit.component.html',
})
export class CategoryCreateEditSharedComponent implements OnInit {
  protected readonly headerNavigationStore = inject(HeaderNavigationStore);
  protected readonly categoryStore = inject(CategoryStore);

  protected readonly validators = Validators;
  protected readonly createCategoryForm = <
    FormGroup<FormGroupMap<CategoryForm>>
  >this.categoryStore.formGroup();

  ngOnInit(): void {
    this.listenToCategoryFormChanges();
    this.getAllByIdAndName();
  }

  private listenToCategoryFormChanges(): void {
    this.categoryStore.syncForm(this.createCategoryForm.valueChanges);
  }

  private getAllByIdAndName(): void {
    const keys: (keyof Category)[] = ['id', 'name'];

    this.categoryStore.getAllWithKeys<Category>(keys);
  }
}
