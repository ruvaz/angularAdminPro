import {Usuario} from "../models/usuario.model";

export interface CargarUsuariosInterface {
  total: number;
  usuarios: Usuario[];
}
