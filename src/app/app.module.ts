import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule} from "@angular/forms";

import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {PagesModule} from "./pages/pages.module";
import {ChartsModule} from "ng2-charts";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        PagesModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule,
      AuthModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
