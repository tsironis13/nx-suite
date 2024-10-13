import { Component, OnInit } from '@angular/core';
import {
  NxSuiteUiButtonComponent,
  NxSuiteUiInputComponent,
  NxSuiteUiLoaderComponent,
  NxSuiteUiSelectComponent,
} from '@nx-suite/shared/ui';
import { CategoryCreateEditSharedComponent } from '../shared/ui/create-edit/create-edit.component';

@Component({
  standalone: true,
  imports: [
    NxSuiteUiSelectComponent,
    NxSuiteUiInputComponent,
    NxSuiteUiButtonComponent,
    NxSuiteUiLoaderComponent,
    CategoryCreateEditSharedComponent,
  ],
  selector: 'eshop-admin-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class EshopAdminCategoryCreateComponent
  extends CategoryCreateEditSharedComponent
  implements OnInit
{
  override ngOnInit(): void {
    this.headerNavigationStore.setTitle('Create Category');
  }

  create(): void {
    this.categoryStore.create();

    this.categoryStore.onCategoryCreated(this.categoryStore.entityCreateLoaded);
  }
}
