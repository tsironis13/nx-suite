import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NxSuiteUiButtonComponent } from '@nx-suite/shared/ui';

@Component({
  selector: 'analog-app-root',
  standalone: true,
  imports: [RouterOutlet, NxSuiteUiButtonComponent],
  template: ` <router-outlet></router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
