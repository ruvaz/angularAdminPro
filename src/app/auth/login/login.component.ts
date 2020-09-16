import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {LoginForm} from "../../interfaces/login-form.interface";
import Swal from "sweetalert2";


//deja de marcar gapi aqui eerror y lo busca en el index
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

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

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

  ngOnInit(): void {
    this.renderButton();
  }
}
