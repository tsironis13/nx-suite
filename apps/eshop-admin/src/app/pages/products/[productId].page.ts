import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h2>Product Details</h2>

    ID: {{ productId$ | async }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductPageComponent {
  readonly #route = inject(ActivatedRoute);

  readonly productId$ = this.#route.paramMap.pipe(
    map((params) => params.get('productId'))
  );
}
