import {Component, OnInit} from '@angular/core';
import {ModalImagenService} from "../../services/modal-imagen.service";
import Swal from "sweetalert2";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  // public ocultarModal: boolean = false;
  public imagenASubir: File;
  public imgTemp: any = null;


  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService:FileUploadService
  ) {
  }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(file: File) {
    //console.log(file);
    this.imagenASubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      //cambiar vista previa
      this.imgTemp = reader.result;
    };
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo= this.modalImagenService.tipo;


    this.fileUploadService.actualizarFoto( this.imagenASubir, tipo, id).
    then( img=> {
      Swal.fire('Guardado',
        'Imagen de usuario actualizada',
        'success'
      );
      //emite que hubo cambio de imagen
      this.modalImagenService.nuevaImagen.emit(img);

      this.cerrarModal();
    }).catch(
      err =>{
        console.error(err);
      });
  }


}
