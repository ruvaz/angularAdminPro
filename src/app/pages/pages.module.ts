import {NgModule} from '@angular/core';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Graficas1Component} from "./graficas1/graficas1.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {PagesRoutesModule} from "./pages.routes";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import {ModalImagenService} from "../services/modal-imagen.service";


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
  ],

  imports: [
    SharedModule,
    PagesRoutesModule,
    FormsModule,
    ReactiveFormsModule,
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
