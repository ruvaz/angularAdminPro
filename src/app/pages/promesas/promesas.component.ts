import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

    //   const promesa = new Promise((resolve, reject)=>{
    //
    //     if(!true){
    //       resolve("Hola desde resolve");
    //     }else{
    //       reject("Algo salio mal");
    //     }
    //   });
    //
    //   promesa.then((mensajeResolve)=>{
    //     console.log(mensajeResolve);
    //   }).catch(()=>{  // para manejar el error que genera el Reject
    //     console.log("manejado el error");
    //   });
    //   console.log("Fin del init");
    //

//-----------1 y 2a forma-----------
//     this.getUsuarios();

//-----------3a forma-----------
    this.getUsuarios()
      .then(usuarios=>{
        console.log(usuarios);
      });

  }//fin init

  getUsuarios() {

    //-----3a forma-------------
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => console.log(body.data));
    });

    //-- forma 1 y 2
    // fetch('https://reqres.in/api/users')
    //-----------1a forma-----------
    // .then(respuesta =>{
    //   respuesta.json().then(body=>console.log(body));
    // });
    //-----------2a forma-----------
    // .then(resp=>resp.json())
    // .then(body=>console.log(body.data));


  }


}
