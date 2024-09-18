import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  get() {
    return ['p1', 'p2'];
  }
}
