import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicosService} from "../../../services/medico.service";
import {Subscription} from "rxjs";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {BusquedasService} from "../../../services/busquedas.service";
import {delay} from "rxjs/operators";
import Swal from "sweetalert2";
import {Medico} from "../../../models/medico.model";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {
  }


  ngOnInit(): void {
    this.cargarMedicos();

    //Refresh de Medicos despues de cargar una imagen
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  buscarTermino(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp;
      });
  }

  cargarMedicos() {
    this.medicosService.cargarMedicos()
      .subscribe(
        medicos => {
          // console.log(medicos);  medicos array[]
          this.medicos = medicos;
          this.cargando = false;
        }
      );
  }

  //
  eliminarMedico(medico) {
    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrarlo!',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.medicosService.borrarMedico(medico._id)
            .subscribe(resp => {
              this.cargarMedicos();
              Swal.fire(
                'Medico eliminado.',
                `${medico.nombre} fue eliminado correctamente.`,
                'success')
            });
        }
      });
  }

  //
  //
  // async abrirSweetAlert() {
  //   const {value = ''} = await Swal.fire<string>({
  //     title: 'Crear Medico',
  //     text: 'Ingrese el nombre del nuevo hospital',
  //     input: 'text',
  //     inputPlaceholder: 'Nombre del hospital',
  //     showCancelButton: true,
  //   });
  //
  //   if (value.trim().length > 0) {
  //     this.medicosService.crearMedico(value)
  //       .subscribe((resp: any) => {
  //         this.medicos.push(resp.hospital)
  //       });
  //   }
  //
  // }
  //
  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal(
      'medicos',
      medico._id,
      medico.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


}
