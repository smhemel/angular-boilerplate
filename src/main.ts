/// <reference types="@angular/localize" />

// Angular modules
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// Internal modules
import { environment } from './environments/environment';

// External modules
import { appConfig } from './app/app.config';

// Components
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
