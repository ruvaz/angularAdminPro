import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario.model";
import {registerFormInterface} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {LoginFormInterface} from "../interfaces/login-form.interface";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {CargarUsuariosInterface} from "../interfaces/cargar-usuarios.interface";
import Swal from "sweetalert2";

const swal = Swal;

const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public auth2: any;
  public usuario: Usuario;


  //se puede hace con rjx o el propio de anguar que es lo mas rapido HttpClientModule importado en el auth module
  constructor(
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone
  ) {
    this.googleInit(); ///singleton
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  //funcion para iniciar el script de google
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
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {   //sighout => libreria externa a angular
      console.log('User signed out ...');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');  //hace ejecucion de esto en angular
      })
    })

  }

  //verificar el token con renewToken
  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map(
        (resp: any) => {
          // this.usuario = resp.usuario;  //puede generar error y no es un inicializacion
          const {email, google, nombre, role, uid, img = ''} = resp.usuario;  //restructura de resp
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid)  //crear un objeto usuario

          this.guardarSesionLocalstorage(resp.token, resp.menu); // guardar token y menu en localstorage

          return true;
        }
      ),
      catchError(error => of(false))  //no se pudo conectar
    );

  }


  //formData de tipo interface registerForm
  crearUsuario(formData: registerFormInterface) {
    //enviar la data por post al backend
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          // console.log('Usuario creado - token jwt')
          this.guardarSesionLocalstorage(resp.token, resp.menu); // guardar token y menu en localstorage
        })
      );
      // .map((resp:any)=>{
      //   swal('Usuario Creado', formData.email,'success');
      //   return resp.usuario;
      // }).catch(err=>{
      //   swal('Error en el Login',err.error.mensaje,'error');
      //   return Observable.throw(err);
      // });
  }

  // actualizarPerfil
  updateUsuario(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role   //agrega el campo role, por que no esta visible en el form
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
      .pipe(
        tap((resp: any) => {
          // console.log('Usuario creado - token jwt')
          // console.log(resp) // usuario json { }
          // Refrescar token
          localStorage.setItem('token', this.token)
        })
      );
  }

  guardarSesionLocalstorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  loginUsuario(formData: LoginFormInterface) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          // console.log('login usuario -jwt');
          // console.log(resp.token);
          // localStorage.setItem('token', resp.token)
          this.guardarSesionLocalstorage(resp.token, resp.menu); // guardar token y menu en localstorage
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

          this.guardarSesionLocalstorage(resp.token, resp.menu);
        })
      );
  }

  //show usuarios
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuariosInterface>(url, this.headers)
      .pipe(
        map(
          resp => {
            // console.log(resp) // array object  {total: _ , usuarios: _ }
            const usuarios = resp.usuarios.map(
              user => new Usuario(
                user.nombre, user.email, '',
                user.img, user.google, user.role, user.uid
              )
            );
            return {
              total: resp.total,
              usuarios
            }
          }
        )
      );
  }

  // Elimina un usuario
  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  //actualiza role o info de un usuario en particular
  guardarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.put(url, usuario, this.headers);
  }


}
