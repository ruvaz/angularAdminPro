import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //se puede hace con rjx o el propio de anguar que es lo mas rapido HttpClientModule importado en el auth module
  constructor(private http:HttpClient) { }

  createUsuario(formData:Usuario){
    console.log('Creando usuario');

  }



}
