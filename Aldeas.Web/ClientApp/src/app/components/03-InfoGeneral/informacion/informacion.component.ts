import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto, FechaElement, MunicipioSeleccionado } from '../../../models/proyect';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { ConsultaDepartamentos, Municipio, Departamento } from '../../../models/ConsultaDepartamentos';

interface Select {
  value: string;
  viewValue: string;
}





@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  @ViewChild('reuniones') table: MatTable<any>;
  @ViewChild('informes') tableInformes: MatTable<any>;
  @ViewChild('departamentos') tableDepartamentos: MatTable<any>;


  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  displayedColumns: string[] = ['position', 'Fecha', 'Quitar'];
  displayedColumnsDepartamento: string[] = ['position', 'Departamento', 'Municipio', 'Quitar'];

  dataSourceComites: FechaElement[] = [];
  dataSourceInformes: FechaElement[] = []
  dataSourcemunicipio: MunicipioSeleccionado[] = [];

  tipoImplementacion: Select[] = [
    { value: 'PROGRAMA ', viewValue: 'PROGRAMA' },
    { value: 'MIXTO', viewValue: 'MIXTO' },
    { value: 'ESPECIAL', viewValue: 'ESPECIAL' }
  ];
  estados: Select[] = [
    { value: 'Propuesta enviada', viewValue: 'Propuesta enviada' },
    { value: 'Proyecto En Implementacion', viewValue: 'Proyecto En Implementacion' },
    { value: 'Proyecto Finalizado', viewValue: 'Proyecto Finalizado' }
  ];

  requiere: Select[] = [
    { value: 'false', viewValue: 'NO' },
    { value: 'true', viewValue: 'SI' }
  ];
  financiacion: Select[] = [
    { value: 'Nacional', viewValue: 'Nacional' },
    { value: 'Internacional', viewValue: 'Internacional' }
  ];
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  tiempo: number;
  previousDate: Date;
  FechaComite: Date;
  FechaInformes: Date;
  AgregarInfome: boolean;
  AgregarMuni: boolean;
  validarNextPantalla_1: boolean;

  validarDepartamentos: boolean;
  ValidarReuniones: boolean;
  ValidarInformes: boolean;


  agregarComite: boolean;
  infoProyecto: Proyecto;


  objetoColombia: ConsultaDepartamentos;
  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];
  codigoDepartamento: number;
  codigoMunicipio: number;

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.FechaComite = new Date();
    this.agregarComite = true;
    this.FechaInformes = new Date();
    this.AgregarInfome = true;
  }
  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }


  AgregarFechaInforme() {


    let conteo = this.dataSourceInformes.length + 1
    let nuevo = new FechaElement(
      this.FechaComite,
      conteo
    );
    this.dataSourceInformes.push(nuevo);
    this.tableInformes.renderRows();

    if (conteo === 5) {
      this.AgregarInfome = false;
    }
    this.ValidarInformes = true
    this.continuar();


  }
  agregarFechaComite() {

    let conteo = this.dataSourceComites.length + 1
    let nuevo = new FechaElement(
      this.FechaComite,
      conteo
    );
    this.dataSourceComites.push(nuevo);
    this.table.renderRows();

    if (conteo === 5) {
      this.agregarComite = false;

    }

    this.ValidarReuniones = true;
    this.continuar();
  }

  eliminarfechaComite(listafecha: FechaElement) {


    this.dataSourceComites = this.dataSourceComites.filter(fecha => {
      return fecha.position !== listafecha.position;
    });

    let conteo = this.dataSourceComites.length
    let conteointerno = 0;
    this.dataSourceComites.forEach(item => {
      conteointerno += 1;
      item.position = conteointerno
    })
    this.table.renderRows();

    if(this.dataSourceComites.length === 0){
      this.ValidarReuniones = false;
    }else{
      this.ValidarReuniones = true
    }
    this.continuar()
    if (5 > conteo) {
      this.agregarComite = true;

    }

  }
  eliminarFechaInforme(listafecha: FechaElement) {

    this.dataSourceInformes = this.dataSourceInformes.filter(fecha => {
      return fecha.position !== listafecha.position;
    });

    let conteointerno = 0;
    this.dataSourceInformes.forEach(item => {
      conteointerno += 1;
      item.position = conteointerno
    })
    this.table.renderRows();



    if(this.dataSourceInformes.length === 0){
      this.ValidarInformes = false;
    }else{
      this.ValidarInformes = true
    }
    this.continuar()

    let conteo = this.dataSourceInformes.length

    if (5 > conteo) {
      this.AgregarInfome = true;
    }

  }

  CambioInformes(event) {
  
    var fecha = moment(this.FechaInformes);
    if (fecha.isValid()) {
      this.AgregarInfome = true;
    } else {
      this.AgregarInfome = false;

    }

  }
  CambioComite(event) {

    var fecha = moment(this.FechaComite);
    if (fecha.isValid()) {
     

      this.agregarComite = true;
    } else {
      this.agregarComite = false;

    }

  }
  calcularDias() {

    var firstDate = moment(this.infoProyecto.FechaInicio);
    var secondDate = moment(this.infoProyecto.FechaFinalizacion);


  
    if (firstDate.isValid() && secondDate.isValid()) {
      if(firstDate.toDate() > secondDate.toDate()){
        this.infoProyecto.FechaFinalizacion = firstDate.toDate();
        secondDate = firstDate
      }
      this.tiempo = this.datediff(firstDate.toDate(), secondDate.toDate());

    } else {
      this.tiempo = 0;
    }



  }


  traerDepartamentos() {
    this.userService.getDepartamentos().subscribe(
      response => {

        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)
       


      },
      error => {
        console.log(error);
      }
    );
  }
  ver() {

    this.calcularDias()
  }

  cambioDepartamento(id) {

    this.MunicipioSeleccionado = this.Municipios.filter(municipio => {
      return municipio.codigoDepartamento === id;
    });

    this.codigoDepartamento = id;
    this.AgregarMuni = true;
  }

  cambioMunicipio(id) {
    this.codigoMunicipio = id;
    this.AgregarMuni = false;

  }

  eliminarMunicipio(listaMunicio: MunicipioSeleccionado) {

    this.dataSourcemunicipio = this.dataSourcemunicipio.filter(item => {
      return item.position !== listaMunicio.position;
    });
    this.tableDepartamentos.renderRows();
    this.actualizarValorMunicipio(false, listaMunicio.CodigoMunicipio);
    this.tableDepartamentos.renderRows();


    if (this.dataSourcemunicipio.length === 0) {
      this.validarDepartamentos = false;
    } else {
      this.validarDepartamentos = true
    }

    this.continuar()




  }
  agregarMunicipio() {

    let municipio = this.Municipios.find(muni => {
      return muni.codigo === this.codigoMunicipio;
    });

    let depar = this.Departamentos.find(depar => {
      return depar.codigo === this.codigoDepartamento;
    });


    let conteo = this.dataSourcemunicipio.length + 1
    let nuevo = new MunicipioSeleccionado
      (
        this.codigoDepartamento,
        this.codigoMunicipio, municipio.nombre,
        depar.nombre,
        this.codigoMunicipio
      );
    this.dataSourcemunicipio.push(nuevo);
    this.tableDepartamentos.renderRows();


    this.actualizarValorMunicipio(true, this.codigoMunicipio)
    this.cambioDepartamento(this.codigoDepartamento);
    this.AgregarMuni = true;

    this.validarDepartamentos = true;
    this.continuar();
  }


  actualizarValorMunicipio(activo: boolean, codigoMunicipio) {
    let actualizar = this.Municipios.find(muni => {
      return muni.codigo === codigoMunicipio;
    });
    actualizar.activo = activo;

    let index = this.Municipios.indexOf(actualizar);
    this.Municipios[index] = actualizar;
  }
  Cambio(event) {

    this.calcularDias()
  }

  onDateChange(newDate: Date): void {
    this.previousDate = new Date(newDate);


  }

  continuar() {
   
    if (this.validarDepartamentos && this.ValidarReuniones && this.ValidarInformes) {
      this.validarNextPantalla_1 = false;
    } else {
      this.validarNextPantalla_1 = true;

    }
  }
  onGuardar() {
    this.infoProyecto.FechasInformes.push(... this.dataSourceInformes);
    this.infoProyecto.FechasComites.push(... this.dataSourceComites);
    this.infoProyecto.Municipio.push(...this.dataSourcemunicipio)
    console.log(this.infoProyecto)
    this.userService.guardarRegistroProyecto(this.infoProyecto).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      },

    )
  }
  ngOnInit(): void {
    this.AgregarMuni = true;
    this.validarNextPantalla_1 = true;
    this.validarDepartamentos = false;
    this.ValidarReuniones = false ;
     this.ValidarInformes = false
    this.infoProyecto = new Proyecto();
    this.calcularDias()

    this.isLinear = true;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 60);
    this.maxDate.setDate(this.maxDate.getDate() + 30);



    this.firstFormGroup = this._formBuilder.group({
      estado: ['', Validators.required],

      proyecto: ['', Validators.required],

      Donante: ['', Validators.required],
      financiacion: ['', Validators.required],

      NombreContacto: ['', Validators.required],
      Direccion: ['', Validators.required],


      email: ['', Validators.required],

      telefono: ['', Validators.required],



      LiderEjecucion: ['', Validators.required],
      LiderCoordinacion: ['', Validators.required],
      ComiteTecnico: ['', Validators.required],
      tipoImplementacion: ['', Validators.required],
      requiere: ['', Validators.required],

      fechas: ['', Validators.required],
      fechasFin: ['', Validators.required],

      



    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.traerDepartamentos();

  }

}
