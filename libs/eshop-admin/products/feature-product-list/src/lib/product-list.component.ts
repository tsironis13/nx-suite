import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsFacade } from '@nx-suite/eshop-admin/products/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'eshop-admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private productListFacade = inject(ProductsFacade);

  ngOnInit() {
    console.log(this.productListFacade.get());
    console.log('on init');
  }
}
