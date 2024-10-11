import { Component, effect, input, InputSignal, OnInit } from '@angular/core';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiInputComponent,
  NxSuiteUiLoaderComponent,
  NxSuiteUiSelectComponent,
} from '@nx-suite/shared/ui';
import { CategoryCreateEditSharedComponent } from '../shared/ui/create-edit/create-edit.component';

interface EshopAdminCategoryEdit {
  id: InputSignal<number>;
}

@Component({
  standalone: true,
  imports: [
    NxSuiteUiSelectComponent,
    NxSuiteUiInputComponent,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
    CategoryCreateEditSharedComponent,
  ],
  selector: 'eshop-admin-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class EshopAdminCategoryEditComponent
  extends CategoryCreateEditSharedComponent
  implements EshopAdminCategoryEdit, OnInit
{
  public readonly id = input.required<number>();

  constructor() {
    super();
    effect(() => {
      this.createCategoryForm.patchValue(this.categoryStore.selectedEntity());
      console.log(this.categoryStore.selectedEntity());
    });
  }

  ngOnInit(): void {
    this.headerNavigationStore.setTitle('Edit Category');

    this.categoryStore.getById(this.id());
  }

  update(): void {
    console.log('update');
  }
}
