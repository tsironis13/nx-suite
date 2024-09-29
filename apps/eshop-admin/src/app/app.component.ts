import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';

import { ShellComponent } from '@nx-suite/eshop-admin/shell';

@Component({
  selector: 'eshop-admin-root',
  standalone: true,
  imports: [TuiRoot, ShellComponent],
  template: `<tui-root>
    <eshop-admin-shell class="block h-full"></eshop-admin-shell>
  </tui-root>`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
