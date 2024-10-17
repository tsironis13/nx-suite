import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withComponentInputBinding } from '@angular/router';
import { provideTrpcClient } from '@nx-suite/shared/domain/trpc-client';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideFileRouter(withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideTrpcClient(),
    provideAnimations(),
    NG_EVENT_PLUGINS,
  ],
};
