import { Injectable } from '@angular/core';
import {UsuarioService} from "./usuario.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];


  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'))||[];
    console.log(this.menu);
  }



}
