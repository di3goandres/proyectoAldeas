import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from '../../../models/proyect';
import * as moment from 'moment';

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

  estados: Select[] = [
    { value: 'Propuesta enviada', viewValue: 'Propuesta enviada' },
    { value: 'Proyecto En Implementacion', viewValue: 'Proyecto En Implementacion' },
    { value: 'Proyecto Finalizado', viewValue: 'Proyecto Finalizado' }
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

  infoProyecto: Proyecto;

  constructor(private _formBuilder: FormBuilder) { }
 datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

  calcularDias() {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = moment(this.infoProyecto.FechaInicio).toDate();
    var secondDate = moment(this.infoProyecto.FechaFinaliacion).toDate() ;

    var first = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDay());
    var second = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDay());


  

    this.tiempo = this.datediff(firstDate, secondDate)
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
      estado: ['', Validators.required],
      financiacion: ['', Validators.required],
      fechas: ['Fecha No valida', Validators.required]


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

  onDateChange(newDate: Date): void {
    this.previousDate = new Date(newDate);


}

}
