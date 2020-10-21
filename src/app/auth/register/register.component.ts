import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {notEqual} from "assert";
import {UsuarioService} from "../../services/usuario.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerform = this.fb.group({
    nombre: ['rub', [Validators.required, Validators.minLength(3)]],
    email: ['qwe@asd.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
    password2: ['123', [Validators.required]],
    terminos: [false, [Validators.requiredTrue]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
  }

  // REGISTER USUARIO
  crearUsuario() {
   // console.log(this.registerform);  //todos los errores tambien
    this.formSubmitted = true;
    if (this.registerform.invalid) {
      return;
    }

    //realizar el post  creando usuario
    this.usuarioService.crearUsuario(this.registerform.value). //enviamos la data del formulario
      subscribe(resp => {
        console.log('Registro de nuevo usuario completo...');
        //navegar al dashboard
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        // console.warn(err.error.msg);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }

  // Validator VALIDA CUALQUIER CAMPO
  campoNoValido(campo: string): boolean {
    if (this.registerform.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // Valida TERMINOS
  aceptaTerminos() {
    return !this.registerform.get('terminos').value && this.formSubmitted;
  }


  // validator para contraseña
  contrasenasNoValidas() {
    const pass1 = this.registerform.get('password').value;
    const pass2 = this.registerform.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

// custom Validator para passwpd
  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({notEsIgual: true})
      }
    }
  }

}
