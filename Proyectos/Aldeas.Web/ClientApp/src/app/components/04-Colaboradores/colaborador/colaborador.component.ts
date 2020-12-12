import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SelectGlobal, CentrosCosto, SubCentro } from '../../../models/comunes';
import * as moment from 'moment';
import { Colaborador } from '../../../models/colaborador';
import { CentroCostosList } from '../../../models/proyect';
import { ItemsProyecto } from '../../../models/ProyectoResponse';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {
  colaborador: Colaborador = new Colaborador()
  Guardando: boolean = false;
  FechaMax: Date = new Date();
  FechaNacimiento: Date = new Date();
  centrosCostos: CentrosCosto[] = [];
  subCentro: SubCentro[] = [];
  subCentroSeleccionado: SubCentro[] = [];
  proyectos: ItemsProyecto[] = [];
  
  firstFormGroup: FormGroup;
  tipoContrado: SelectGlobal [] = [
    { value: 'FIJO ', viewValue: 'FIJO' },
    { value: 'INDEFINIDO ', viewValue: 'INDEFINIDO' },
    { value: 'OBRA LABOR', viewValue: 'OBRA LABOR' },
    { value: 'PRESTACION DE SERVICIOS', viewValue: 'PRESTACION DE SERVICIOS' },

  ];
  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
    private modalService: NgbModal,
  ) { }

  fechaNacimiento(event) {
    console.log(event)
    var fecha = moment(this.FechaNacimiento);


  }


  traerProyectos() {
    this.userService.getProyectos().subscribe(
      response => {
        this.proyectos.push(...response.itemsProyectos)
      },
      error => {
        console.log(error);
      }
    );
  }
  FechaInicio(event) {
    var firstDate = moment(this.colaborador.FechaInicio);
    var secondDate = moment(this.colaborador.FechaFin);



    if (firstDate.isValid() && secondDate.isValid()) {
      if (firstDate.toDate() > secondDate.toDate()) {
        this.colaborador.FechaFin = firstDate.toDate();
        secondDate = firstDate
      }

    }

  }

  cambioCentroCosto(id) {

    this.subCentroSeleccionado = this.subCentro.filter(item => {
      return item.codigoCentro === id;
    });

  }
  traerCentrosCostos() {
    this.userService.getCentrosResponse().subscribe(
      response => {

        this.centrosCostos.push(...response.centrosCostos)
        this.subCentro.push(...response.subCentro)
      },
      error => {
        console.log(error);
      }
    );
  }

  MostrarExitoso:boolean = false;
  onGuardar(){
    this.Guardando = true;
   
    this.userService.guardarColaborador(this.colaborador).subscribe(
      response => {
        this.colaborador = new Colaborador();
        this.Guardando = false;
        console.log(response)

        this.registroExitoso()
        this.MostrarExitoso = true;
      },
      error => {
        console.log(error);
        this.registroNoExitoso("Error", error)
        this.Guardando = false;

      }
    );

  }

  
  validarCentroCosto: boolean =false;
  onNotificarCentroCosto(list: CentroCostosList[]){

    if(list.length === 0){
      this.validarCentroCosto = false;
    }else{
      this.validarCentroCosto = true;

    }
    this.colaborador.ListCentroCostos = [];
    this.colaborador.ListCentroCostos.push(...list) 
   
  }
  cambiarGuardar(){  
    if(this.firstFormGroup.valid && this.validarCentroCosto){
      this.Guardando  = false;

    }else{
      this.Guardando  = true;

    } 
  }
  ngOnInit(): void {
    this.traerProyectos();
    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      NombreColaborador: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Cargo: ['', Validators.required],
      Tiempo: ['', Validators.required],
      TipoContrato: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      Fechafin: ['', Validators.required],
      Costo: ['', Validators.required],

     
      Porcentaje: ['', Validators.required],
      Contrapartida: ['', Validators.required],
      Aporte: ['', Validators.required]

    });


  }


  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
     
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  registroNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


}
