import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileListFacade {
  get() {
    return ['profile1', 'profile2'];
  }
}
