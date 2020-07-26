import {NgModule} from '@angular/core';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";

import {PAGES_ROUTES} from "./pages.routes";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],

  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
})

export class PagesModule {
}
