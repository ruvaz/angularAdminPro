import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

import {AuthGuard} from "../guards/auth.guard";


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
    canLoad:[],
    loadChildren: () => import('./child-routes.module').then(m =>m.ChildRoutesModule)   // carga de rutasHijas lazyload
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutesModule {
}

