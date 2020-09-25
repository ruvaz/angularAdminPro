import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario.model";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;

  constructor(
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    // obtiene los usuarios a partir del numero deseado
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        //console.log(resp);ok: true, total: 26 , uid: "5f5c20aaa5cc9944208d596d"
        // usuarios: Array(5)
        this.totalUsuarios = total;

        if(usuarios.length!==0){
          this.usuarios = usuarios;
        }
      });
  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde<0){
      this.desde=0;
    }else if(this.desde>=this.totalUsuarios){
      this.desde -= valor;
    }
    //refresh usuarios
    this.obtenerUsuarios();
  }
}
