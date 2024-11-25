import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'portfolio-root',
  standalone: true,
  imports: [TuiRoot, RouterOutlet],
  template: `<tui-root> <router-outlet></router-outlet> </tui-root>`,
})
export class AppComponent {}
