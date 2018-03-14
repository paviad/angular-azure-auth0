import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RoutingModule } from './routing/routing.module';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { CallbackComponent } from './pages/callback/callback.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import * as AppStore from './store';
import { BackendService } from './services/backend.service';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { FlexDirective } from './directives/flex.directive';
import { FlexitemDirective } from './directives/flexitem.directive';

const matModules = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSortModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    MyCurrencyPipe,
    FlexDirective,
    FlexitemDirective,
    OtherComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreRouterConnectingModule,
    matModules,
    StoreModule.forRoot(AppStore.reducers),
    EffectsModule.forRoot(AppStore.effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [
    AuthService,
    BackendService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'he-IL' },
    { provide: CurrencyPipe, useClass: MyCurrencyPipe },
    { provide: RouterStateSerializer, useClass: AppStore.CustomSerializer },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
