import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  template: ` <h2>Products List</h2> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListPageComponent {}
