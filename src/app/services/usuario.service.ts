import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario.model";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {LoginForm} from "../interfaces/login-form.interface";
import {tap} from "rxjs/operators";


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //se puede hace con rjx o el propio de anguar que es lo mas rapido HttpClientModule importado en el auth module
  constructor(private http:HttpClient) { }


  //formData de tipo interface registerForm
  createUsuario(formData:RegisterForm){
    console.log('Creando usuario service');
    //enviar la data por post al backend
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp:any)=> {
          console.log(resp )
          localStorage.setItem('token',resp.token)
        })
      );

  }

  loginUsuario(formData:LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp:any)=> {
          console.log(resp )
          localStorage.setItem('token',resp.token)
        })
      );
  }

}
