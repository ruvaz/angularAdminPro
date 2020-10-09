import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital.model";
import Swal from "sweetalert2";
import {log} from "util";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";
import {BusquedasService} from "../../../services/busquedas.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit , OnDestroy{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private hospitalServices: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {
  }

  ngOnInit(): void {
    this.cargarHospitales();

    //Refresh de hospitales despues de cargar una imagen
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscarTermino(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp;
      });
  }

  cargarHospitales() {
    this.hospitalServices.cargarHospitales()
      .subscribe(
        hospitales => {
          // console.log(hospitales);  hospitales array[]
          this.hospitales = hospitales;
          this.cargando = false;
        }
      );
  }

  guardarCambios(hospital) {
    this.hospitalServices.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(
        resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        }
      );
  }


  eliminarHospital(hospital) {

    this.hospitalServices.borrarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });
  }


  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalServices.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
        });
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img);
  }
}
