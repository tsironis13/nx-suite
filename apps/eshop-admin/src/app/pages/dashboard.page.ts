import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `<div>dashboard page</div>`,
})
export default class DashboardPageComponent {}
