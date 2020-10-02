import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import Swal from "sweetalert2";

import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario.model";
import {BusquedasService} from "../../../services/busquedas.service";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private  busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    // obtiene los usuarios a partir del numero deseado
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        //console.log(resp);ok: true, total: 26 , uid: "5f5c20aaa5cc9944208d596d"
        if (usuarios.length !== 0) {

          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;

        }
        this.cargando = false;
      });

  }


  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    //refresh usuarios
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino)
      .subscribe((resultados:Usuario[]) =>
    {
      this.usuarios = resultados;
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrarlo!',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              this.cargarUsuarios();
              Swal.fire(
                'Usuario borrado.',
                `${usuario.nombre} fue eliminado correctamente.`,
                'success')
            });
        }
      });

  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        // console.log(resp);
      });
  }


  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)
  }


}
