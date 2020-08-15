import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa = new Promise((resolve, reject)=>{

      if(!true){
        resolve("Hola desde resolve");
      }else{
        reject("Algo salio mal");
      }
    });

    promesa.then((mensajeResolve)=>{
      console.log(mensajeResolve);
    }).catch(()=>{  // para manejar el error que genera el Reject
      console.log("manejado el error");
    });
    console.log("Fin del init");

  }




}
