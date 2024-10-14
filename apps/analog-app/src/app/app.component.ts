import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxSuiteUiButtonComponent } from '@nx-suite/shared/ui';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'analog-app-root',
  standalone: true,
  imports: [TuiRoot, NxSuiteUiButtonComponent],
  template: `<tui-root>
    <nx-suite-ui-button [disabled]="false" [appearance]="'primary'" [size]="'m'"
      >Create</nx-suite-ui-button
    >
  </tui-root> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
