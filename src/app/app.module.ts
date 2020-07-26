import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule} from "@angular/forms";

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {PagesModule} from "./pages/pages.module";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
    imports: [
        BrowserModule,
        PagesModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
