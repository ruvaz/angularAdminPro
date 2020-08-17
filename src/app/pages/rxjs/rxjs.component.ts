import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
    let i = -1;

    // el $ es para indicar que queremos que lo este observando, sera un observable
    const obs$ = new Observable(observer => {
      const intervalo = setInterval(() => {
        // console.log('tick');
        i++;
        // sigujiente valor que voy a emtir
        // el next se retorna al subscriber como valor
        observer.next(i);

        if (i == 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          console.log('i=2... error  ');
          observer.error('i llego al valor de 2');
        }

      }, 1000);
    });


    obs$.pipe(
      //va a probar una y otra ves hasta que lo logre
      retry(1) // 1 numero de reintentos a realizar
    )
      // objs detecta que nadie le escucha no se activa
      .subscribe(
        //para activar el obs hay que suscribirse para escucharlo
        valor => console.log('subscribed: ', valor), //next
        (error) => console.log('Error: ', error),  //error
        () => console.log('Obs terminado')   //compleate
      );


  }

  ngOnInit(): void {
  }

}
