import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFacade {
  get() {
    return ['cat1', 'cat2'];
  }
}
