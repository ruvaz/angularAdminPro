import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {notEqual} from "assert";
import {UsuarioService} from "../../services/usuario.service";


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
    terminos: [false, [Validators.required]],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor(
    private fb: FormBuilder,
    private service:UsuarioService
              ) {
  }

  ngOnInit(): void {
  }


  crearUsuario() {

    // console.log(this.registerform.value); // valores de inputs
    console.log(this.registerform);  //todos los errores tambien

    if (this.registerform.valid) {
      console.log('Formulario enviado correctamente.')
      this.formSubmitted = true;
    } else {
      console.log('Formulario no es correcto.')
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerform.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerform.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerform.get('password').value;
    const pass2 = this.registerform.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({notEsIgual: true})
      }
    }
  }

}
