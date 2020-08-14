import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {NgModule} from "@angular/core";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'graficas1', component: Graficas1Component},
      {path: 'account-settings', component: AccountSettingsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutesModule {
}
