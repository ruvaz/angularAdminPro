import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BusquedasService} from "../../services/busquedas.service";
import {Usuario} from "../../models/usuario.model";
import {Medico} from "../../models/medico.model";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, //obtener valores GET
    private busquedaService: BusquedasService,
  ) {
  }

  ngOnInit(): void {
    //obtenemos termino para cargar los resultados y pintarlos
    this.activatedRoute.params.subscribe(({termino}) => {
      this.busquedaGlobal(termino);

    })
  }


  busquedaGlobal(termino: string) {
    this.busquedaService.busquedaGlobal(termino)
      .subscribe((resp:any)  => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;

      });
  }

}
