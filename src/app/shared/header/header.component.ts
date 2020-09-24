import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario:Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario= usuarioService.usuario;
  }


  logoutDeUsuario() {
    this.usuarioService.logoutUsuario();
    console.log('Logout hecho...')
  }
}
