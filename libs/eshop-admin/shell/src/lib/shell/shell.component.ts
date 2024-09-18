import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiBadge } from '@taiga-ui/kit';

@Component({
  selector: 'eshop-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, TuiBadge],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {}
