import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})

// corresponde a un grupo de botones de incremento.
export class IncrementadorComponent implements OnInit {
//input recibe
  @Input('nombrePropio') leyendaHijo: string = "LeyendaHijo";
  // class para el btn
  @Input() btnClass: string = "btn-primary";

  //valor que recibe
  @Input('valor') progreso: number = 40;
  // output equivale a un clic de evento en html
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }


  cambiaValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChangess(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    }else {
      this.progreso = nuevoValor;
    }
  }

}
