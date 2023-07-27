

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_DATE_CONFIG, NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES, ca_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

//providers para el interceptor, lenguaje de la pagina y componentes utilizados para la aplicacion
registerLocaleData(es);

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: NZ_DATE_CONFIG,
      useValue: {
        firstDayOfWeek: 1
      }
    },
    { provide: NZ_I18N, useValue: es_ES }, { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
