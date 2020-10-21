import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuario = usuarioService.usuario;
  }


  logoutDeUsuario() {
    this.usuarioService.logoutUsuario();
    console.log('Logout hecho...')
  }

  busquedaGlobal(termino: string) {

    if (termino.length===0){
      return;
    }
    //redireccion a pagina de resultados de busqueda
    this.router.navigateByUrl(`/dashboard/search/${termino}`);
  }
}
