import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {NgModule} from "@angular/core";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {PromesasComponent} from "./promesas/promesas.component";
import {RxjsComponent} from "./rxjs/rxjs.component";
import {AuthGuard} from "../guards/auth.guard";
import {PerfilComponent} from "./perfil/perfil.component";

//Mantenimientos
import {UsuariosComponent} from "./mantenimientos/usuarios/usuarios.component";
import {HospitalesComponent} from "./mantenimientos/hospitales/hospitales.component";
import {MedicosComponent} from "./mantenimientos/medicos/medicos.component";
import {MedicoComponent} from "./mantenimientos/medicos/medico.component";
import {BusquedaComponent} from "./busqueda/busqueda.component";
import {AdminGuard} from "../guards/admin.guard";


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
      {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas 1'}},
      {path: 'search/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},

      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RSJX'}},

      //Mantenimientos

      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
      {path: 'medicos/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medico'}},

      //admin links

      {path: 'usuarios', canActivate: [AdminGuard],component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutesModule {
}

