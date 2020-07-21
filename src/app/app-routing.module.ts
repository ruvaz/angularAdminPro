import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NopagefoundComponent} from "./shared/nopagefound/nopagefound.component";
import {AuthRoutingModule} from "./auth/auth.routing";


const routes: Routes = [
  //path: '/dashboard/'  Pagesrouting
  //path: '/auth' Authroutung
  //path: '/medicos' MedicosRouting
  //path: '/compras' ComprasRouting
  // 404
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
