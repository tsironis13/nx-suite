import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileListFacade } from '@nx-suite/analog-app/profile/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'analog-app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  private profileListFacade = inject(ProfileListFacade);

  ngOnInit() {
    console.log(this.profileListFacade.get());
  }
}
