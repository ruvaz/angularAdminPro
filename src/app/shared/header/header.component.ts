import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private usuarioService: UsuarioService
  ) {
  }


  logoutDeUsuario() {
    this.usuarioService.logoutUsuario();
    console.log('Logout hecho...')
  }
}
