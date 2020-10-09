import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital.model";
import {MedicosService} from "../../../services/medico.service";
import {Medico} from "../../../models/medico.model";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSelecto: Hospital;
  public medicoSelecto: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicosService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    //obtiene los parametros que recibimos en el GET url  destructurando id
    //suscribe al params para detectar cambios
    this.activatedRouter.params
      .subscribe(({id}) => {
        //cada que recibamos algo por la url
        this.cargarMedico(id);
      })


    //obtenerlista de hispitales para Select
    this.cargarHospitales();

    // Inicializar Formulario
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    //Crear un observable para su valor si cambia
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelecto = this.hospitales.find(h => h._id === hospitalId);
      })
  }

  //obtiene un medico en GET medicos/:id
  cargarMedico(id: string) {
    if(id==='nuevo'){
      return;  //ho hara nada si no hay un id, validacion previa en front
    }

    this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(100)  //leve delay para que se detecte el cambio de los datos del medico
      )
      .subscribe(medico => {
        if(!medico){
          //Si no existe medico redirecciono a la lista de medicos
          this.router.navigateByUrl(`/dashboard/medicos/`);
        }

        const {nombre, hospital: {_id}} = medico;
        // console.log(nombre,_id);
        this.medicoSelecto = medico;
        this.medicoForm.setValue({nombre, hospital: _id});  //cambio de valores del medico
            // se agrega delay para que se detecte este cambio
      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        // console.log(hospitales);
        this.hospitales = hospitales;

      });
  }

  guardarMedico() {
    //obtener nombre del form
    const {nombre} =this.medicoForm.value;

    if (this.medicoSelecto) {
      //actualizar Medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelecto._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          console.log(resp)
           Swal.fire('Actualizado', `${nombre} creado correctamente`, 'success');

        });
    } else {
      //Crear medico nuevo
      console.log(this.medicoForm.value);
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`);
        });
    }


  }


}
