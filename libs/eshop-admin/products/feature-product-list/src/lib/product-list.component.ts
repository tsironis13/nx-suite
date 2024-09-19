import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProductsFacade } from '@nx-suite/eshop-admin/products/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'eshop-admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EshopAdminProductListComponent implements OnInit {
  readonly #productListFacade = inject(ProductsFacade);

  ngOnInit() {
    console.log(this.#productListFacade.get());
    console.log('on init');
  }
}
