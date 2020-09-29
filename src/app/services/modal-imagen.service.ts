import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

const base_ur = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  //emmiter que indice al front que hubo un cambio en la imagen
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_ur}/upload/${tipo}/${img}`
    }
    console.log(this.img);
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
