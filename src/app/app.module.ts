import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {HeaderComponent} from "./components/app-module/header/header.component";
import {LoginComponent} from "./components/app-module/login/login.component";
import {RegisterComponent} from "./components/app-module/register/register.component";
import {MyAccountComponent} from "./components/app-module/my-account/my-account.component";

import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51JQTpcSBPdzm0lyUWHqQNT0q5yKfF0BCFh7QYX3hE6rxANh79ffztByYuLLmIsJHmxeYGQk5PV2dfjBDNXzjyIEw00EwdtwXK7')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
