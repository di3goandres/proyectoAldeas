import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Detalle } from '../../../models/presupuesto/detalle.presupuesto.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PresupuestoRequest } from '../../../models/presupuesto/data.presupuesto.request';
import { Task } from '../../../models/checkbox';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { PrincipalpresupuestoComponent } from '../principalpresupuesto/principalpresupuesto.component';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-actualizardetalle',
  templateUrl: './actualizardetalle.component.html',
  styleUrls: ['./actualizardetalle.component.css'],
  providers: [PrincipalpresupuestoComponent ]
})
export class ActualizardetalleComponent implements OnInit {

  @Input() entrada: Detalle


  guardar = new PresupuestoRequest();
  final = false;
  pucMostrar: PresupuestoRequest[] = [];

  formgroupNomina: FormGroup;
  formgroupNormal: FormGroup;
  formgroupFamiliar: FormGroup;
  valorMensual = 0;
  permitirGuardar = false;

  displayedColumns: string[] = ['Enero', 'Febrero',
    'Marzo', 'Abril', 'Mayo', 'Junio'];

  displayedColumns2: string[] = ['Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre']
  dataSource: MatTableDataSource<PresupuestoRequest>;


  presupuesto: string;

   // { pregunta: 'Presupuesto Anual', name: 'ENERO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'FEBRERO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'MARZO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'ABRIL', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'MAYO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'JUNIO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'JULIO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'AGOSTO', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'SEPTIEMBRE', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'OCTUBRE', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'NOVIEMBRE', completed: false, esOtro: false, color: 'primary' },
      // { pregunta: 'Presupuesto Anual', name: 'DICIEMBRE', completed: false, esOtro: false, color: 'primary' },
  presupuestoCheck: Task = {
    pregunta: 'Presupuesto Anual',
    name: 'Presupuesto Anual (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
     
    ]
  };

  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private presupuestoService: PresupuestoService,
    private changeDetectorRef: ChangeDetectorRef, 
    private presupusto: PrincipalpresupuestoComponent,
    private modalService: NgbModal


  ) { }

  onNotificar(event: Task, cambioValor) {

    if (event != null)
      this.presupuestoCheck = event;
    if (!cambioValor) {

      this.presupuestoCheck.subtasks.forEach(t => {
        if (t.name == event.name) {
          t.completed = event.completed;
        }
      });
    }


    let seleccionados = this.presupuestoCheck.subtasks.filter(t => {
      return t.completed == true
    });
    let numeroMeses = seleccionados.length;
    this.dejarEnceros();
    if (this.valorMensual != 0) {

      let valorMes = this.valorMensual / numeroMeses;
      seleccionados.forEach(item => {
        this.agregarValorAlCampo(item, valorMes);
      })
    }


    this.pucMostrar = [];
    this.pucMostrar.push(this.guardar);
    this.dataSource = new MatTableDataSource(this.pucMostrar);

    this.validarFomularios();

  }

  Cambiar() {

    this.onNotificar(null, true)

  }
  Actualizar() {
   
    this.pucMostrar = [];
    this.pucMostrar.push(this.guardar);
    this.dataSource = new MatTableDataSource(this.pucMostrar);
    this.validarFomularios();

  }

  dejarEnceros() {
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

  ponerdatosMes() {
    this.entrada.enero === 0 ? this.cuadrarDatos("ENERO", false) : this.cuadrarDatos("ENERO", true)
    this.entrada.febrero === 0 ? this.cuadrarDatos("FEBRERO", false) : this.cuadrarDatos("FEBRERO", true)
    this.entrada.marzo === 0 ? this.cuadrarDatos("MARZO", false) : this.cuadrarDatos("MARZO", true)
    this.entrada.abril === 0 ? this.cuadrarDatos("ABRIL", false) : this.cuadrarDatos("ABRIL", true)
    this.entrada.mayo === 0 ? this.cuadrarDatos("MAYO", false) : this.cuadrarDatos("MAYO", true)
    this.entrada.junio === 0 ? this.cuadrarDatos("JUNIO", false) : this.cuadrarDatos("JUNIO", true)
    this.entrada.julio === 0 ? this.cuadrarDatos("JULIO", false) : this.cuadrarDatos("JULIO", true)
    this.entrada.agosto === 0 ? this.cuadrarDatos("AGOSTO", false) : this.cuadrarDatos("AGOSTO", true)
    this.entrada.septiembre === 0 ? this.cuadrarDatos("SEPTIEMBRE", false) : this.cuadrarDatos("SEPTIEMBRE", true)
    this.entrada.octubre === 0 ? this.cuadrarDatos("OCTUBRE", false) : this.cuadrarDatos("OCTUBRE", true)
    this.entrada.noviembre === 0 ? this.cuadrarDatos("NOVIEMBRE", false) : this.cuadrarDatos("NOVIEMBRE", true)
    this.entrada.diciembre === 0 ? this.cuadrarDatos("DICIEMBRE", false) : this.cuadrarDatos("DICIEMBRE", true)


  }
  cuadrarDatos(mes, completed) {



    // this.presupuestoCheck.subtasks.forEach(element => {

    //   if (element.name == mes) {
    //     element.completed = completed
    //   }

    // });

    let nuevo = new Task()
    nuevo.pregunta = 'Presupuesto Anual',
      nuevo.name = mes,
      nuevo.completed = completed,
      nuevo.color = 'primary'
    this.presupuestoCheck.subtasks.push(nuevo)
    this.presupuestoCheck.subtasks.forEach(element => {
      if(element.name==mes){
        element.completed = completed
      }
    });
    console.log( nuevo)
    console.log( this.presupuestoCheck.subtasks.filter(item=> {return item.name==mes}))

  }
  agregarValorAlCampo(event: Task, cantidad) {
    event.completed = true;

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


  validarFomularios() {
    let seleccionados = this.presupuestoCheck.subtasks.filter(t => {
      return t.completed == true;
    });

    let numeroMeses = seleccionados.length;
    if (this.entrada.esNomina) {
      this.permitirGuardar = this.formgroupNomina.valid && this.formgroupNormal.valid && numeroMeses > 0

    }
    if (this.entrada.esPptp) {
      this.permitirGuardar = this.formgroupFamiliar.valid && this.formgroupNormal.valid && numeroMeses > 0

    }
    if (this.entrada.esPptp == false && this.entrada.esNomina == false) {
      this.permitirGuardar = this.formgroupNormal.valid && numeroMeses > 0

    }

    //  this.changeDetectorRef.detectChanges()
  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  cerrar() {
    this.activeModal.dismiss()
  }

  guardarData() {
    console.log(this.guardar)
    this.presupuestoService.updatePresupuesto(this.guardar).subscribe(
      OK => {

        this.openExitoso()
        this.activeModal.close(this.entrada.idPresupuesto)
       
      },
      Error => { console.log(Error) },

    )

  }

  /** Dartos de presupuestos */

  mostrarOtro: boolean = false;
  firstFormGroup: FormGroup;
  otroValor: string;
  allComplete: boolean = false;

  taskSeleccionado: Task;
  lista = [] = [0, 1, 2, 3]

  ngAfterViewChecked(): void {


  }

 
  datos() {
    this.guardar.idPresupuesto = this.entrada.id;
    this.guardar.NumeroIdentificacion = this.entrada.numeroIdentificacion;
    this.guardar.Nombre = this.entrada.nombre;
    this.guardar.Asignacion = this.entrada.asignacion;
    this.guardar.DetalleGasto = this.entrada.detalleGasto;
    this.guardar.NotaIngles = this.entrada.notaIngles;
    this.guardar.NoCasa = this.entrada.noCasa;
    this.guardar.NoKids = this.entrada.noKids;

  
    this.ponerdatosMes()

    this.valorMensual = this.entrada.total;
    this.final = true;

  }
  ngOnInit(): void {

    this.datos()
    // this.presupuestoCheck.subtasks = []
    this.permitirGuardar = false;

    this.dataSource = new MatTableDataSource(this.pucMostrar);
    this.formgroupNomina = this._formBuilder.group({

      numeroIdentificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
      asignacion: ['', Validators.required],
      // cargo: ['', Validators.required],

    })
    this.formgroupFamiliar = this._formBuilder.group({

      NoCasa: ['', Validators.required],
      NoKids: ['', Validators.required],
    })

    this.formgroupNormal = this._formBuilder.group({

      valor: ['', Validators.required],
      detalleGasto: ['', Validators.required],
      Ingles: ['', Validators.nullValidator],




    })

    this.firstFormGroup = this._formBuilder.group({
      Multiple: ['', Validators.required],

      Otro: [''],

    });


    this.presupuestoCheck.subtasks.forEach(item => {
      item.formValid = false;
      item.valorOtro = ''

    })

    this.allComplete = false;


  }

}
