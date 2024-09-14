import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule, provideStore } from '@ngxs/store';
import { NgxsReduxDevtoolsPlugin, NgxsReduxDevtoolsPluginModule, withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserSatate } from './states/user.state';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([UserSatate], {
        developmentMode: true,
      }),
      HttpClientModule
    ),withNgxsReduxDevtoolsPlugin({
      disabled:  false
    })
    , provideAnimationsAsync()
  ]
};
