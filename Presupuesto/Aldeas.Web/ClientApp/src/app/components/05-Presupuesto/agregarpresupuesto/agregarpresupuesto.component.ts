import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoCategoria, PresupuestoPuc } from '../../../models/presupuesto/data.presupuesto.response';
import { PresupuestoRequest } from '../../../models/presupuesto/data.presupuesto.request';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../../models/checkbox';

@Component({
  selector: 'app-agregarpresupuesto',
  templateUrl: './agregarpresupuesto.component.html',
  styleUrls: ['./agregarpresupuesto.component.css']
})
export class AgregarpresupuestoComponent implements OnInit {

  @Input() datoRubro: PresupuestoCategoria;
  @Input() dataPuc: PresupuestoPuc;
  guardar = new PresupuestoRequest();
  formgroupNomina: FormGroup;
  formgroupNormal: FormGroup;
  valorMensual = 12000000;
  presupuesto: string;
  presupuestoCheck: Task = {
    pregunta: 'Presupuesto Anual',
    name: 'Presupuesto Anual (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
      { pregunta: 'Presupuesto Anual', name: 'ENERO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'FEBRERO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'MARZO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'ABRIL', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'MAYO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'JUNIO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'JULIO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'AGOSTO', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'SEPTIEMBRE', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'OCTUBRE', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'NOVIEMBRE', completed: false, esOtro: false, color: 'primary' },
      { pregunta: 'Presupuesto Anual', name: 'DICIEMBRE', completed: false, esOtro: false, color: 'primary' },
    ]
  };



  onNotificar(event: Task, Tipo: any) {
    this.presupuestoCheck = event;
    let seleccionados = event.subtasks.filter(t => {
      return t.completed == true;
    });

    this.dejarEnceros();
    if(this.valorMensual!=0){
      let numeroMeses = seleccionados.length;
      let valorMes = this.valorMensual / numeroMeses;
      seleccionados.forEach(item=> {
          this.agregarValorAlCampo(item, valorMes);
      })
    }
    console.log( this.guardar);
  }

  Cambiar(){
    this.onNotificar(this.presupuestoCheck, "")
  }

  dejarEnceros(){
    this.guardar.Enero = 0;
    this.guardar.Febrero = 0;
    this.guardar.Marzo = 0;
    this.guardar.Abril = 0;
    this.guardar.Mayo = 0;
    this.guardar.Junio = 0;
    this.guardar.Julio = 0;
    this.guardar.Agosto = 0;
    this.guardar.Septiembre = 0;
    this.guardar.Octubre = 0;
    this.guardar.Noviembre = 0;
    this.guardar.Diciembre = 0;

  }

  agregarValorAlCampo(event: Task, cantidad) {

    switch (event.name) {
      case "ENERO":
        this.guardar.Enero = cantidad;
        break;
      case "FEBRERO":
        this.guardar.Febrero = cantidad;
        break;
      case "MARZO":
        this.guardar.Marzo = cantidad;
        break;
      case "ABRIL":
        this.guardar.Abril = cantidad;
        break;
      case "MAYO":
        this.guardar.Mayo = cantidad;
        break;
      case "JUNIO":
        this.guardar.Junio = cantidad;
        break;
      case "JULIO":
        this.guardar.Julio = cantidad;
        break;
      case "AGOSTO":
        this.guardar.Agosto = cantidad;
        break;
      case "SEPTIEMBRE":
        this.guardar.Septiembre = cantidad;
        break;
      case "OCTUBRE":
        this.guardar.Octubre = cantidad;
        break;
      case "NOVIEMBRE":
        this.guardar.Noviembre = cantidad;
        break;
      case "DICIEMBRE":
        this.guardar.Diciembre = cantidad;
        break;
      default:
        break;
    }
  }
  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.formgroupNomina = this._formBuilder.group({

      numeroIdentificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
      asignacion: ['',  Validators.required ],
      cargo: ['', Validators.required],

    })

    this.formgroupNormal = this._formBuilder.group({

      valor: ['', Validators.required],
   

    })
  }

  cerrar() {
    this.activeModal.dismiss()
  }

  
}


