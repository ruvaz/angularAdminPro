import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario.model";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {LoginForm} from "../interfaces/login-form.interface";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";


const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public auth2: any;
  public usuario:Usuario;


  //se puede hace con rjx o el propio de anguar que es lo mas rapido HttpClientModule importado en el auth module
  constructor(
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone
  ) {
    this.googleInit(); ///singleton
  }


  googleInit() {
    return new Promise(resolve => {

      console.log('Google Init...')
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: environment.GOOGLE_ID,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    });


  }

  logoutUsuario() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {   //sighout => libreria externa a angular
      console.log('User signed out google...');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');  //hace ejecucion de esto en angular
      })
    })

  }

  //verificar el token con renewToken
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap(
        (resp: any) => {
           // this.usuario = resp.usuario;  //puede generar error y no es un inicializacion
          const {email,google,nombre,role,uid,img} = resp.usuario;  //restructura de resp
          this.usuario = new Usuario(nombre,email, '',img,google,role,uid)  //crear un objeto usuario
          localStorage.setItem('token', resp.token);
        }
      ),
      map(resp => true),
      catchError(error => {
        console.log(error);
        of(false)
      })  //no se pudo conectar
    );

  }


  //formData de tipo interface registerForm
  createUsuario(formData: RegisterForm) {
    //enviar la data por post al backend
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          console.log('Usuario creado - token jwt')
          console.log(resp.token)
          localStorage.setItem('token', resp.token)
        })
      );

  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log('login usuario -jwt');
          console.log(resp.token);
          localStorage.setItem('token', resp.token)
        })
      );
  }


  //Servicio de login con Google
  loginGoogle(token) {
    console.log('---------');
    //token es un objeto por eso {token}
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          console.log('Token JWT despues de el token de google....');
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
        })
      );
  }

}
