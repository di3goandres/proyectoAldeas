import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectGlobal } from 'src/app/models/comunes';
import { ItemsColaboradores } from '../../../models/colaborardor/colaborador.response';
import * as moment from 'moment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorService } from '../../../services/colaborador/colaborador.service';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
@Component({
  selector: 'app-editarcolaborador',
  templateUrl: './editarcolaborador.component.html',
  styleUrls: ['./editarcolaborador.component.css']
})
export class EditarcolaboradorComponent implements OnInit {
  firstFormGroup: FormGroup;
  @Input() colaboradorEntrada: ItemsColaboradores;
  colaborador: ItemsColaboradores;

  FechaMax: Date = new Date();
  tipoContrado: SelectGlobal [] = [
    { value: 'FIJO ', viewValue: 'FIJO' },
    { value: 'INDEFINIDO ', viewValue: 'INDEFINIDO' },
    { value: 'OBRA LABOR', viewValue: 'OBRA LABOR' },
    { value: 'PRESTACION DE SERVICIOS', viewValue: 'PRESTACION DE SERVICIOS' },

  ];
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private service: ColaboradorService, 

  ) { }
  Cerrar() {
    this.activeModal.close("close")
  }

  ngOnInit(): void {
    this.colaborador = new ItemsColaboradores();
    this.colaborador.id = this.colaboradorEntrada.id;
    this.colaborador.nombre = this.colaboradorEntrada.nombre;
    this.colaborador.fecha = this.colaboradorEntrada.fechaNacimiento;
    this.colaborador.cargo = this.colaboradorEntrada.cargo;
    this.colaborador.tiempo = this.colaboradorEntrada.tiempo;
    this.colaborador.tipoContrato = this.colaboradorEntrada.tipoContrato;
    this.colaborador.costoMensual = this.colaboradorEntrada.costoMensual;
    this.colaborador.costoMensual = this.colaboradorEntrada.costoMensual;
    this.colaborador.porcentaje = this.colaboradorEntrada.porcentaje;
    this.colaborador.contrapartida = this.colaboradorEntrada.contrapartida;
    this.colaborador.aporte = this.colaboradorEntrada.aporte;
    this.colaborador.fechaFin = this.colaboradorEntrada.fechaFin;
    this.colaborador.fechaInicio = this.colaboradorEntrada.fechaInicio;
    this.colaborador.aporte = this.colaboradorEntrada.aporte;

    


    this.firstFormGroup = this._formBuilder.group({


      NombreColaborador: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Cargo: ['', Validators.required],
      Tiempo: ['', Validators.required],
      TipoContrato: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      Fechafin: ['', Validators.required],
      Costo: ['', Validators.required],

     
      Porcentaje: ['', [Validators.min(0), Validators.max(100)]],
      Contrapartida: ['', Validators.required],
      Aporte: ['', Validators.required]
    });
  }

  onGuardar(){
    console.log(this.colaborador)
    this.service.actualizarColaborador(this.colaborador).subscribe(
      OK => {

        if(OK.code==200){
          this.activeModal.close("OK")
          this.registroExitoso();
        }else{
          this.registroNoExitoso("Valide los datos", "Por favor seleccione todos los datos")
        }
      
       
      },
      ERROR => { 
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
        this.activeModal.close("NOK")
        },
    )
  }

  FechaInicio(event) {
    var firstDate = moment(this.colaborador.fechaInicio);
    var secondDate = moment(this.colaborador.fechaFin);



    if (firstDate.isValid() && secondDate.isValid()) {
      if (firstDate.toDate() > secondDate.toDate()) {
        this.colaborador.fechaFin = firstDate.toDate();
        secondDate = firstDate
      }

    }

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
