import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {LoginForm} from "../../interfaces/login-form.interface";
import Swal from "sweetalert2";
import {environment} from "../../../environments/environment";


//deja de marcar gapi aqui eerror y lo busca en el index
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  // va a contener toda la autenticacion
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
  }

  loginUsuario() {
    console.log(this.loginForm.value)
    //this.router.navigateByUrl('/');
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(resp => {
      console.log('Login exitoso...');
      // console.log(resp);
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value)
      } else {
        localStorage.removeItem('email');
      }

    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });

    });
  }

  //* ** Googlesign in

  // var id_token = googleUser.getAuthResponse().id_token;


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }


  startApp() {
    gapi.load('auth2',  () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: environment.GOOGLE_ID,
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
      // login con exito  se tiene token
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        //dispara la autenticacion
        this.usuarioService.loginGoogle(id_token);

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


  ngOnInit(): void {
    this.renderButton();
  }
}
