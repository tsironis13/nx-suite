import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileListFacade } from '@nx-suite/analog-app/profile/domain';
import { NxSuiteUiButtonComponent} from '@nx-suite/shared/ui';

@Component({
  standalone: true,
  imports: [CommonModule, NxSuiteUiButtonComponent],
  selector: 'analog-app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  readonly #profileListFacade = inject(ProfileListFacade);

  ngOnInit() {
    console.log(this.#profileListFacade.get());
  }
}
