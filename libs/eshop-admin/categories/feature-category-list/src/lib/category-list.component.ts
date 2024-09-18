import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesFacade } from '@nx-suite/eshop-admin/categories/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'eshop-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  private categoriesListFacade = inject(CategoriesFacade);

  ngOnInit() {
    console.log(this.categoriesListFacade.get());
  }
}
