import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectGlobal } from 'src/app/models/comunes';
import { ItemProyecto } from 'src/app/models/proyectos/proyecto.unico.response';
import * as moment from 'moment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService } from '../../../../services/proyectos/proyecto.service';
import { ItemProyectoRequest } from '../../../../models/proyectos/proyecto.unico.response';
import { ItemsProyecto } from 'src/app/models/ProyectoResponse';

@Component({
  selector: 'app-actualizaritemproyecto',
  templateUrl: './actualizaritemproyecto.component.html',
  styleUrls: ['./actualizaritemproyecto.component.css']
})
export class ActualizaritemproyectoComponent implements OnInit {
  firstFormGroup: FormGroup;
  @Input() infoProyecto: ItemProyecto

  estados: SelectGlobal[] = [
    { value: 'Propuesta enviada', viewValue: 'Propuesta enviada' },
    { value: 'Proyecto En Implementacion', viewValue: 'Proyecto En Implementacion' },
    { value: 'Proyecto Finalizado', viewValue: 'Proyecto Finalizado' }
  ];

  financiacion: SelectGlobal[] = [
    { value: 'Nacional', viewValue: 'Nacional' },
    { value: 'Internacional', viewValue: 'Internacional' }
  ];
  tipoImplementacion: SelectGlobal[] = [
    { value: 'PROGRAMA', viewValue: 'PROGRAMA' },
    { value: 'MIXTO', viewValue: 'MIXTO' },
    { value: 'ESPECIAL', viewValue: 'ESPECIAL' }
  ];
  requiere: SelectGlobal[] = [
    { value: 'false', viewValue: 'NO' },
    { value: 'true', viewValue: 'SI' }
  ];


  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: ProyectoService,


  ) { }
  close() {
    this.activeModal.close("MOK")
  }
  Cambio(event) {

    this.calcularDias()
  }
  calcularDias() {

    var firstDate = moment(this.infoProyecto.fecha_inicio);
    var secondDate = moment(this.infoProyecto.fecha_finalizacion);



    if (firstDate.isValid() && secondDate.isValid()) {
      if (firstDate.toDate() > secondDate.toDate()) {
        this.infoProyecto.fecha_finalizacion = this.infoProyecto.fecha_inicio
        secondDate = firstDate
      }
      // this.tiempo = this.datediff(firstDate.toDate(), secondDate.toDate());
    }



  }
  itemProyectoUpdate = new ItemProyectoRequest();
  onGuardar() {

    this.itemProyectoUpdate.ItemProyecto = this.infoProyecto;
    this.service.ActualizarItemProyecto(this.itemProyectoUpdate).subscribe(
      OK => { console.log(OK)
        if(OK.code==200){
          this.activeModal.close("OK")
        }else{
          this.activeModal.close("NOK")
        }
      },
      ERROR => { 
        this.activeModal.close("NOK")
        console.log(ERROR) },
    )
  }
  ngOnInit(): void {
    this.infoProyecto.requiereLiquidacionv = this.infoProyecto.requiereLiquidacion ? "true" : "false"
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
  }

}
