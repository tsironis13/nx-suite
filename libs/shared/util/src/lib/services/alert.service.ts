import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { take } from 'rxjs';
import { AlertAppearance } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly #alerts = inject(TuiAlertService);

  public showNotification(
    msg: string,
    heading: string,
    appearance: AlertAppearance
  ): void {
    this.#alerts
      .open(msg, { label: heading, appearance })
      .pipe(take(1))
      .subscribe();
  }
}
