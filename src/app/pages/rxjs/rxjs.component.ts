import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
      // el $ es para indicar que queremos que lo este observando, sera un observable
    const obs$ = new Observable(observer =>{

      let i = -1;
      const intervalo = setInterval( ()=>{
        // console.log('tick');
      i++;
      // sigujiente valor que voy a emtir
        // el next se retorna al subscriber como valor
        observer.next(i);

        if(i==4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===2){
          observer.error('i llego al valor de 2');
        }

      },1000);
    });
    // objs detecta que nadie le escucha no se activa
    //para activar el obs hay que suscribirse para escucharlo
    obs$.subscribe(
      valor=> console.log('subscribed: ', valor), //next
      (error)=>console.log('Error: ',error),  //error
      ()=>console.log('Obs terminado')   //compleate
    );


  }

  ngOnInit(): void {
  }

}
