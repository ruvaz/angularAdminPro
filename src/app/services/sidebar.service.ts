import { Injectable } from '@angular/core';
import {UsuarioService} from "./usuario.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url:'/' },
        { titulo: "ProgressBar", url:'progress' },
        { titulo: "Graficas", url:'graficas1' },
        { titulo: "Promesas", url:'promesas' },
        { titulo: "Rxjs", url:'rxjs' },
      ]
    },

  ];


  constructor() {  }



}
