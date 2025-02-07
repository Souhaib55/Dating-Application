import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) , 
    
    provideHttpClient(),

    provideAnimations(),
    provideAnimations(),
    provideToastr(
      {
        positionClass: 'toast-bottom-right'
      }
    )
  ]
};
