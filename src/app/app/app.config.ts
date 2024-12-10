import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideStore} from "@ngrx/store";
import * as fromProject from './store/project/project.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      project: fromProject.projectReducer,
    }),
    // provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
