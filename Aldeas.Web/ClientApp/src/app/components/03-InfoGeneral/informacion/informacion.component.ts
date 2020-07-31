import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from '../../../models/proyect';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';

interface Select {
  value: string;
  viewValue: string;
}

export class FechaElement {
  constructor(
    public Fecha: Date,
    public position: number,
  ) {

  }

}

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  @ViewChild('reuniones') table: MatTable<any>;
  @ViewChild('informes') tableInformes: MatTable<any>;

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  displayedColumns: string[] = ['position', 'Fecha'];
  dataSourceComites: FechaElement[] =[];
  dataSourceInformes: FechaElement[] = []

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

  agregarComite: boolean;
  infoProyecto: Proyecto;

  constructor(private _formBuilder: FormBuilder) {
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
    
    if(conteo===5){
      this.AgregarInfome = false;
    }
  }
  agregarFechaComite() {

    let conteo = this.dataSourceComites.length + 1
    let nuevo = new FechaElement(
      this.FechaComite,
      conteo
    );
    this.dataSourceComites.push(nuevo);
    this.table.renderRows();
    
    if(conteo===5){
    this.agregarComite = false;

    }
  }
  eliminarfechaComite(listafecha: FechaElement) {
    
    console.log(listafecha);
    this.dataSourceComites = this.dataSourceComites.filter(fecha => {
      return fecha.position !== listafecha.position;
    });
    this.table.renderRows();
    

    let conteo = this.dataSourceComites.length 
    console.log('Numero Final', conteo)
    if(5> conteo){
      this.agregarComite = true;
  
      }

  }
  eliminarFechaInforme(listafecha: FechaElement) {
    
    console.log(listafecha);
    this.dataSourceInformes = this.dataSourceInformes.filter(fecha => {
      return fecha.position !== listafecha.position;
    });
    this.table.renderRows();
    

    let conteo = this.dataSourceInformes.length 

    if(5> conteo){
      this.AgregarInfome = true;
      }

  }
  
  CambioInformes(event) {
    console.log(event);
    var fecha = moment(this.FechaInformes);
    if (fecha.isValid()) {
      this.AgregarInfome = true;
    } else {
      this.AgregarInfome = false;

    }

  }
  CambioComite(event) {
    console.log(event);
    var fecha = moment(this.FechaComite);
    if (fecha.isValid()) {
      console.log('valida', fecha.isValid());

      this.agregarComite = true;
    } else {
      this.agregarComite = false;

    }

  }
  calcularDias() {

    var firstDate = moment(this.infoProyecto.FechaInicio);
    var secondDate = moment(this.infoProyecto.FechaFinaliacion);


    if (firstDate.isValid() && secondDate.isValid()) {
      this.tiempo = this.datediff(firstDate.toDate(), secondDate.toDate());

    } else {
      this.tiempo = 0;
    }



  }
  ngOnInit(): void {
    this.infoProyecto = new Proyecto();
    this.calcularDias()

    this.isLinear = true;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 60);
    this.maxDate.setDate(this.maxDate.getDate() + 30);



    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      controlNombre: ['', Validators.required],
      email: ['', Validators.required],
      estado: ['', Validators.required],
      telefono: ['', Validators.required],
      financiacion: ['', Validators.required],
      fechas: ['', Validators.required],
      fechasFin: ['', Validators.required],

      requiere: ['', Validators.required]


    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  ver() {
    console.log(this.infoProyecto);
    this.calcularDias()
  }

  Cambio(event) {

    this.calcularDias()
  }

  onDateChange(newDate: Date): void {
    this.previousDate = new Date(newDate);


  }

}
