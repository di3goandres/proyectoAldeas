import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/checkbox';
import { ItemFinanciera, ItemFinancieraRequest } from 'src/app/models/proyectos/proyecto.unico.response';
import { ProyectoService } from 'src/app/services/proyectos/proyecto.service';
import { SelectGlobal } from '../../../../models/comunes';

@Component({
  selector: 'app-actualizariteminfofinanciera',
  templateUrl: './actualizariteminfofinanciera.component.html',
  styleUrls: ['./actualizariteminfofinanciera.component.css']
})
export class ActualizariteminfofinancieraComponent implements OnInit {
  @Input() itemFinanciera: ItemFinanciera
  itemFinancieraUpdate = new ItemFinanciera();

  secondFormGroup: FormGroup;
  Fuente: SelectGlobal[] = [
    { value: 'CONTRAPARTIDA', viewValue: 'CONTRAPARTIDA' },
    { value: 'APORTE DEL DONANTE', viewValue: 'APORTE DEL DONANTE' },

  ];
  TipoFuente: SelectGlobal[] = [
    { value: 'EFECTIVO', viewValue: 'EFECTIVO' },
    { value: 'ESPECIE', viewValue: 'ESPECIE' },

  ];
  moneda = ""
  monedaChecK: Task[] = [
    { id: 0, pregunta: 'MONEDA', name: 'USD', completed: false, esOtro: false, color: 'primary' },
    { id: 0, pregunta: 'MONEDA', name: 'EURO', completed: false, esOtro: false, color: 'primary' },
    { id: 0, pregunta: 'MONEDA', name: 'COP', completed: false, esOtro: false, color: 'primary' },
    { id: 0, pregunta: 'MONEDA', name: 'Otra', completed: false, esOtro: true, color: 'primary' },
  ]
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: ProyectoService,

  ) { }

  Close() {
    this.activeModal.close("MOK")
  }
  onNotificar(event: Task, Tipo: any) {
    this.verificarMoneda(event);
  }
  ValidarMoneda: boolean = true;

  verificarMoneda(event: Task) {
    if (event.esOtro) {
      this.ValidarMoneda = event.formValid;
      this.itemFinancieraUpdate.monedaDonacion = event.valorOtro
    } else {
      this.ValidarMoneda = true;
      this.itemFinancieraUpdate.monedaDonacion = event.name
    }

  }

  dataFinaniera = new ItemFinancieraRequest();
  onGuardar() {
    this.dataFinaniera.ItemFinanciera = this.itemFinancieraUpdate;
    this.service.ActualizarItemFinanciera(this.dataFinaniera).subscribe(
      OK => {
        console.log(OK)
        if (OK.code == 200) {
          this.activeModal.close("OK")
        } else {
          this.activeModal.close("NOK")
        }
      },
      ERROR => {
        this.activeModal.close("NOK")
        console.log(ERROR)
      },

    )
  }
  ngOnInit(): void {
    this.itemFinancieraUpdate.id = this.itemFinanciera.id;
    this.itemFinancieraUpdate.costoTotal = this.itemFinanciera.costoTotal;
    this.itemFinancieraUpdate.plataContrapartida = this.itemFinanciera.plataContrapartida;
    this.itemFinancieraUpdate.fuente = this.itemFinanciera.fuente;
    this.itemFinancieraUpdate.tipoFuente = this.itemFinanciera.tipoFuente;
    this.itemFinancieraUpdate.plataDonante = this.itemFinanciera.plataDonante;
    this.itemFinancieraUpdate.monedaDonacion = this.itemFinanciera.monedaDonacion;
    this.itemFinancieraUpdate.tasacambio = this.itemFinanciera.tasacambio;
    this.itemFinancieraUpdate.cuenta = this.itemFinanciera.cuenta;
    this.itemFinancieraUpdate.navision = this.itemFinanciera.navision;
    this.itemFinancieraUpdate.responsable = this.itemFinanciera.responsable;
    this.itemFinancieraUpdate.lugar = this.itemFinanciera.lugar;



    this.itemFinancieraUpdate.monedaDonacion;

    let filtro = this.monedaChecK.filter(item => {
      return item.name == this.itemFinancieraUpdate.monedaDonacion
    }
    );
    if (filtro.length == 0) {
      this.monedaChecK.forEach(element => {
        if (element.esOtro) {
          element.completed = true;
          element.valorOtro = this.itemFinancieraUpdate.monedaDonacion;
        }
      });
      this.moneda = "Otra";
    } else {

      this.monedaChecK.forEach(element => {
        this.moneda = this.itemFinancieraUpdate.monedaDonacion;

        if (this.moneda == element.name) {
          element.completed = true;

        }
      });
    }

    console.log(this.moneda)








    this.moneda = this.itemFinanciera.monedaDonacion;
    this.secondFormGroup = this._formBuilder.group({

      CostoTotal: ['', Validators.required],
      valorContrapartida: ['', Validators.required],
      valorDonante: ['', Validators.required],
      Fuente: ['', Validators.required],
      TipoFuente: ['', Validators.required],
      TasaCambio: ['', Validators.required],
      Cuenta: ['', Validators.required],

      Navision: ['', Validators.required],

      responsable: ['', Validators.nullValidator],
      lugar: ['', Validators.nullValidator],





    });
  }

}
