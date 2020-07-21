import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
       {path: '', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'graficas1', component: Graficas1Component},

    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
