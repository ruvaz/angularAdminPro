import {NgModule} from '@angular/core';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {PagesRoutesModule} from "./pages.routes";


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    AccountSettingsComponent,
  ],

  imports: [
    SharedModule,
    PagesRoutesModule,
    FormsModule,
    CommonModule,
    ComponentsModule,

  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    AccountSettingsComponent,
  ],
})

export class PagesModule {
}
