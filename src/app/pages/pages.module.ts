import {NgModule} from '@angular/core';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PagesRoutesModule} from "./pages.routes";
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {PerfilComponent} from './perfil/perfil.component';
import {UsuariosComponent} from './mantenimientos/usuarios/usuarios.component';
import {HospitalesComponent} from './mantenimientos/hospitales/hospitales.component';
import {MedicosComponent} from './mantenimientos/medicos/medicos.component';
import {ImagenPipe} from "../pipes/imagen.pipe";
import {PipesModule} from "../pipes/pipes.module";
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

// Modulo para centralizar todos los componentes usados en
// y no llenar app.module.ts
@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    PipesModule
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
