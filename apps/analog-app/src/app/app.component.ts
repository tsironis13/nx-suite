import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'analog-app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}
