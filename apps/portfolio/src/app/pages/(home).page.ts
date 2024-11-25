import { Component } from '@angular/core';

import { ShellComponent } from '@nx-suite/portfolio/shell';

@Component({
  selector: 'portfolio-container',
  standalone: true,
  imports: [ShellComponent],
  template: ` <portfolio-shell class="block h-full"></portfolio-shell> `,
})
export default class HomeComponent {}
