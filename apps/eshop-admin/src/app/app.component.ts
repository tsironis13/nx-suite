import { Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

import { ShellComponent } from '@nx-suite/eshop-admin/shell';

@Component({
  selector: 'eshop-admin-root',
  standalone: true,
  imports: [TuiRoot, TuiBadge, ShellComponent],
  template: `<eshop-admin-shell></eshop-admin-shell
    ><tui-root
      >test
      <tui-badge appearance="success" tuiStatus> Success </tui-badge>
      <tui-badge appearance="warning">Warning</tui-badge>
      <tui-badge appearance="neutral">Neutral</tui-badge>
      <tui-badge appearance="info">Info</tui-badge>
    </tui-root>

    <tui-badge appearance="success" tuiStatus> Success </tui-badge>
    <tui-badge appearance="warning">Warning</tui-badge>
    <tui-badge appearance="neutral">Neutral</tui-badge>
    <tui-badge appearance="info">Info</tui-badge> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
