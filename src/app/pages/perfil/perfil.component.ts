import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario.model";
import {FileUploadService} from "../../services/file-upload.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenASubir:File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService
  ) {
    // carga usuario en sesion
    this.usuario= this.usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }
//cuando cambia imagen previa se obtiene el nombre
  cambiarImagen(file:File){
    //console.log(file);
    this.imagenASubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = ()=>{
      //cambiar vista previa
      this.imgTemp= reader.result;
    };
  }

  //Boton Cambiar imagen
  subirImagen(){
    this.fileUploadService.actualizarFoto(
      this.imagenASubir,
      'usuarios',
      this.usuario.uid).
    then( img=> {
      this.usuario.img = img;
      Swal.fire('Guardado',
        'Imagen de usuario actualizada',
        'success'
      );
    }).catch(
      err =>{
        console.error(err);
      });
  }


  actualizarPerfil() {
    //console.log(this.perfilForm.value);
    this.usuarioService.updateUsuario(this.perfilForm.value)
      .subscribe(()=>{
        const {nombre,email} = this.perfilForm.value;
        this.usuario.nombre= nombre;
        this.usuario.email = email;
        Swal.fire('Guardado',
          'Cambios fueron guardados',
          'success'
          );

      },(err)=>{
        //console.log(err.error);
        // error de registro de usuario
        Swal.fire('Error',
          err.error.msg,
          'error'
        );
      });
  }


}
