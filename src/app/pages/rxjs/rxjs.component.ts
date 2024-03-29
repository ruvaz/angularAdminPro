import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscribable, Subscription} from "rxjs";
import {filter, map, retry, take} from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  constructor() {

    this.retornaObservable().pipe(
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


    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log);
    //   .subscribe((valor)=>{
    //   console.log(valor);
    // });
  }

  ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    this.intervalSubs.unsubscribe();
    }

  //mas facil de entender y mantener usar las utils de rxjs
  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500)
      .pipe(
        //take dice cuando esta compleate el obs
        // take(10),  //se cambio un el unsiscribe...
        // recibe el valor de 0 y el sma uno
        //map trnasforma lo que reciba a como queramos
        map(valor => {
          return valor + 1;
          // return 'HOla mundo cruel '+valor;
        }),
        filter(valor=>(valor%2===0)?true:false)
      );
    return intervalo$;
  }

  // obener datos con logica sin usar utils de rxjs, es mas latoso
  private retornaObservable(): Observable<number> {
    let i = -1;

    // el $ es para indicar que queremos que lo este observando, sera un observable
    const obs$ = new Observable<number>(observer => {
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

    return obs$;
  }

  ngOnInit(): void {

  }
}
