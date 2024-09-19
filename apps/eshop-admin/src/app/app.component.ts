import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

import { ShellComponent } from '@nx-suite/eshop-admin/shell';
import { TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';

@Component({
  selector: 'eshop-admin-root',
  standalone: true,
  imports: [TuiRoot, TuiBadge, ShellComponent, TuiIcon, TuiIconPipe, TuiSwitch],
  template: `<tui-root>
    <eshop-admin-shell class="block h-full"></eshop-admin-shell>
  </tui-root>`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
