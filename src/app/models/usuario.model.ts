import {environment} from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) {
  }


  getImagenUrl() {
    if (!this.img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;  //url con https
    } else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`; //url sin https
    } else {
      return `${base_url}/upload/usuarios/no-image`; //url local no image sin https
    }
  }
}
