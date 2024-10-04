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
    ReactiveFormsModule,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
  ],
  selector: 'eshop-admin-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class EshopAdminCategoryCreateComponent implements OnInit {
  protected readonly validators = Validators;

  readonly #headerNavigationStore = inject(HeaderNavigationStore);
  protected readonly categoryStore = inject(CategoryStore);

  protected readonly createCategoryForm = <
    FormGroup<FormGroupMap<CategoryForm>>
  >this.categoryStore.formGroup();

  constructor() {
    this.listenToCategoryFormChanges();
    this.listenToCategoryCreation();
  }

  ngOnInit(): void {
    this.#headerNavigationStore.setTitle('Create Category');
    this.getAllByIdAndName();
  }

  create() {
    this.categoryStore.create();
  }

  private listenToCategoryFormChanges() {
    this.categoryStore.syncForm(this.createCategoryForm.valueChanges);
  }

  private listenToCategoryCreation() {
    this.categoryStore.onCategoryCreated(this.categoryStore.entityCreateLoaded);
  }

  private getAllByIdAndName() {
    const keys: (keyof Category)[] = ['id', 'name'];

    this.categoryStore.getAllWithKeys<Category>(keys);
  }
}
