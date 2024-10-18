import { inject } from '@angular/core';
import { signalStoreFeature, withMethods } from '@ngrx/signals';
import { AlertService } from '@nx-suite/shared/util';

export function withNotificationService() {
  return signalStoreFeature(
    withMethods(() => {
      const alertService = inject(AlertService);
      return {
        showErrorNotification(
          msg: string,
          heading = 'An error occured!'
        ): void {
          alertService.showNotification(msg, heading, 'error');
        },
        showSuccessNotification(msg: string, heading = 'Success!'): void {
          alertService.showNotification(msg, heading, 'success');
        },
      };
    })
  );
}
