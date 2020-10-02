import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // pipe para obtener imagen ->> {{hospital.img|imagen:'hospitales'}}
  transform(img: string, tipo:'usuarios'|'medicos'|'hospitales'): string {

    if (!img) {
      return `${base_url}/upload/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;  //url con https
    } else if (img) {
      return `${base_url}/upload/${tipo}/${img}`; //url sin https
    } else {
      return `${base_url}/upload/${tipo}/no-image`; //url local no image sin https
    }
  }

}
