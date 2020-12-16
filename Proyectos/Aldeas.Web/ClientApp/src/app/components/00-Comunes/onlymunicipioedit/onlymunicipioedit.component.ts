import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento, Municipio } from 'src/app/models/ConsultaDepartamentos';
import { ItemsMunicipio } from 'src/app/models/proyectos/proyecto.unico.response';
import { UserService } from 'src/app/services/user.service';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ItemMunicipioRequest } from '../../../models/proyectos/proyecto.unico.response';

@Component({
  selector: 'app-onlymunicipioedit',
  templateUrl: './onlymunicipioedit.component.html',
  styleUrls: ['./onlymunicipioedit.component.css']
})
export class OnlymunicipioeditComponent implements OnInit {
  @Input() itemsMunicipio: ItemsMunicipio;
  itemsMunicipioUpdate = new ItemsMunicipio();

  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];
  codigoDepartamento: number;
  codigoMunicipio: number;
  AgregarMuni: boolean;
  firstFormGroup: FormGroup;

  constructor(
    public userService: UserService,
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: ProyectoService

  ) { }

  ngOnInit(): void {
    this.traerDepartamentos();
    this.firstFormGroup = this._formBuilder.group({
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],

    });
  }

  cambioDepartamento(id) {

    this.MunicipioSeleccionado = this.Municipios.filter(municipio => {
      return municipio.codigoDepartamento === id;
    });

    this.codigoDepartamento = id;
    this.codigoMunicipio = null;
    this.AgregarMuni = true;

  }
  Cerrar() {
    this.activeModal.close("MOK")
  }

  cambioMunicipio(id) {
    this.codigoMunicipio = id;
    this.AgregarMuni = false;

  }
  traerDepartamentos() {
    this.userService.getDepartamentos().subscribe(
      response => {


        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)

        this.cambioDepartamento(this.itemsMunicipio.id_departamento)
        this.codigoMunicipio = this.itemsMunicipio.id_municipio;

      },
      error => {
        console.log(error);
      }
    );
  }
  data = new ItemMunicipioRequest();
  onGuardar() {
    this.data.itemsMunicipios = new ItemsMunicipio();
    this.itemsMunicipioUpdate.id = this.itemsMunicipio.id;
    this.itemsMunicipioUpdate.id_departamento = this.itemsMunicipio.id_departamento;
    this.itemsMunicipioUpdate.id_municipio = this.codigoMunicipio;
    this.data.itemsMunicipios = this.itemsMunicipioUpdate;

    console.log(this.data)
    this.service.ActualizarMunicipio(this.data).subscribe(
      OK => { 
           this.activeModal.close("OK")
        
        console.log(OK) },
      ERROR => { console.log(ERROR)
        this.activeModal.close("NOK")
      },
    )
  }
}
