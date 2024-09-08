// Angular modules
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  HttpClient,
  withFetch,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

// External modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';

// Internal modules
import { environment } from '@env/environment';
import { routes } from './app.routes';

// Services
import { AppService } from '@services/app.service';
import { StoreService } from '@services/store.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Routing
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),

    importProvidersFrom(
      // Angular modules
      BrowserModule,

      // External modules
      TranslateModule.forRoot({
        defaultLanguage: environment.defaultLanguage,
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
      AngularSvgIconModule.forRoot()

      // Internal modules
    ),

    // External modules

    // Services
    StoreService,
    AppService,

    // Pipes
    DatePipe,

    // Guards

    // Resolvers
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideClientHydration(),
  ],
};
