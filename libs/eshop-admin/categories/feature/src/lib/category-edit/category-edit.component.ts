import {
  Component,
  effect,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  untracked,
} from '@angular/core';
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
  implements EshopAdminCategoryEdit, OnInit, OnDestroy
{
  public readonly id = input.required<number>();

  readonly #fetchCategoryEffect = effect(() => {
    const entity = this.categoryStore.entity();

    untracked(() => {
      if (entity) {
        console.log(entity);
        this.createCategoryForm.patchValue(entity);
      }
    });
  });

  override ngOnInit(): void {
    this.headerNavigationStore.setTitle('Edit Category');

    this.categoryStore.getById(this.id());
  }

  ngOnDestroy(): void {
    this.categoryStore.updateEntity(null);
  }

  update(): void {
    console.log('update');
  }
}
