import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  EshopAdminHeaderComponent,
  EshopAdminNavigationComponent,
  EshopAdminSidebarComponent,
} from '@nx-suite/eshop-admin/shared/ui';
import { ButtonComponent } from '@nx-suite/shared/ui';
import { TuiScrollbar } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

@Component({
  selector: 'eshop-admin-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    TuiBadge,
    ButtonComponent,
    TuiScrollbar,
    EshopAdminHeaderComponent,
    EshopAdminSidebarComponent,
    EshopAdminNavigationComponent,
  ],
  providers: [],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
