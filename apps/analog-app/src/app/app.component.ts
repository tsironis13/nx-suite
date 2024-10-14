import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ShellComponent } from '@nx-suite/eshop-admin/shell';

@Component({
  selector: 'analog-app-root',
  standalone: true,
  imports: [TuiRoot, ShellComponent],
  template: `<tui-root>
    <eshop-admin-shell class="block h-full"></eshop-admin-shell>
  </tui-root> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
