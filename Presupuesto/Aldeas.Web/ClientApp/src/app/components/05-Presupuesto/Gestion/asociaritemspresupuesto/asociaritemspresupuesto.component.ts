import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PresupuestoRequest } from '../../../../models/presupuesto/data.presupuesto.request';
import { PresupuestoCategoria, PresupuestoPuc, PresupuestoPrograma, PresupuestoCeco, PresupuestoSubCeco } from '../../../../models/presupuesto/data.presupuesto.response';
import { Task } from '../../../../models/checkbox';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoService } from '../../../../services/presupuesto.service';
import { ActivatedRoute } from '@angular/router';
import { Detalle } from '../../../../models/presupuesto/detalle.presupuesto.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PresupuestoListRequest } from 'src/app/models/presupuesto/list.presupuesto.response';
import { PrerubrospucsComponent } from '../../prerubrospucs/prerubrospucs.component';
import { RegistroexitosoComponent } from '../../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-asociaritemspresupuesto',
  templateUrl: './asociaritemspresupuesto.component.html',
  styleUrls: ['./asociaritemspresupuesto.component.css']
})
export class AsociaritemspresupuestoComponent implements OnInit {
  MostrarExitoso = false;
  Guardando = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  /**infro de la primera pantalla */

  /*
  detalle familiares
  */
  mostrar = false;
  dataSourceFamiliar: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('tableFamiliar') tableFamilia: MatTable<Detalle>;
  /*
    Fin detalle familiares
    */
  programaRequest = new PresupuestoListRequest()
  dataSourcePresupuesto: Detalle[] = [];
  myControl = new FormControl();
  programas: PresupuestoPrograma
  centroCostos: PresupuestoCeco[] = []
  centroCostosSeleccionado: PresupuestoCeco[] = []
  subCentros: PresupuestoSubCeco[] = []
  subCentrosSeleccionado: PresupuestoSubCeco[] = []

  categorias: PresupuestoCategoria[] = []
  categoriaSeleccionada: PresupuestoCategoria;

  pucs: PresupuestoPuc[] = []
  pucSeleccionados: PresupuestoPuc[] = []
  pubGuardar = new PresupuestoPuc();
  idPrograma = 0;
  servicioSeleccionado = 0;

  guardar = new PresupuestoRequest();

  // fin info segunda pantalla



  /**segunda pestaña */

  datoRubro = new PresupuestoCategoria();



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

  constructor(
    // private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private presupuestoService: PresupuestoService,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private modalService: NgbModal


  ) { }

  onNotificar(event: Task, Tipo: any) {

    this.presupuestoCheck = event;
    let seleccionados = event.subtasks.filter(t => {
      return t.completed == true;
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
    this.onNotificar(this.presupuestoCheck, "")

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


  validarFomularios() {
    let seleccionados = this.presupuestoCheck.subtasks.filter(t => {
      return t.completed == true;
    });

    let numeroMeses = seleccionados.length;
    if (this.datoRubro.esNomina) {
      this.permitirGuardar = this.formgroupNomina.valid && this.formgroupNormal.valid && numeroMeses > 0

    }
    if (this.datoRubro.esppto) {
      this.permitirGuardar = this.formgroupFamiliar.valid && this.formgroupNormal.valid && numeroMeses > 0

    }
    if (this.datoRubro.esppto == false && this.datoRubro.esNomina == false) {
      this.permitirGuardar = this.formgroupNormal.valid && numeroMeses > 0

    }

  }


  // cerrar() {
  //   this.activeModal.dismiss()
  // }

  guardarData() {
    console.log(this.guardar)
    this.presupuestoService.guardarPresupuesto(this.guardar).subscribe(
      OK => {

        // this.activeModal.close(this.guardar)
      },
      Error => { console.log(Error) },

    )

  }

  onGuardar() {

  }
 

  getPucsRubro(id) {

    this.presupuestoService.getDataPucsRubro(id).subscribe(

      OK => {

        this.pucs = []
        this.pucs.push(...OK.pucs)
        this.changeDetectorRefs.detectChanges();

      },
      Error => { console.log(Error) },

    )
  }
  getDetalle(id) {
    let number = 0;
    this.dataSourcePresupuesto = []
    if (id == null) {
      number = this.programaRequest.idPresupuesto
    } else {
      number = id;

    }
    this.presupuestoService.getDetallePresupuesto(number).subscribe(

      OK => {
        console.log(OK)
        this.dataSourcePresupuesto = []
        if (OK.detallePresupuesto != null)
          this.dataSourcePresupuesto.push(...OK.detallePresupuesto)
        this.changeDetectorRefs.detectChanges();
        this.getFamiliar();
      },
      Error => { console.log(Error) },

    )
  }
  getFamiliar() {
    //  this.changeDetectorRefs.detectChanges();

    let detalleList = this.dataSourcePresupuesto.filter(item => {
      return item.esPptp === true;
    })
    this.mostrar = true;
    console.log(detalleList)
    // this.dataSourceFamiliar =  new MatTableDataSource()
    this.dataSourceFamiliar = new MatTableDataSource(detalleList);
    this.dataSourceFamiliar.paginator = this.paginator;
    this.dataSourceFamiliar.sort = this.sort
  }


  //  constructor(
  //    private presupuestoService: PresupuestoService,
  //    private route: ActivatedRoute,
  //    private changeDetectorRefs: ChangeDetectorRef,
  //    private modalService: NgbModal) { }


  onChange(value) {


    this.idPrograma = value
    this.subCentrosSeleccionado = []
    this.centroCostosSeleccionado = this.centroCostos.filter(item => {
      return item.idPrograma == value
    })
  }

  onChangeCategoria(value) {

    this.categoriaSeleccionada = this.categorias.find(item => {
      return item.id == value;
    })

    this.datoRubro =  this.categoriaSeleccionada;

    this.pubGuardar.id = 0;

    this.getPucsRubro(value)
    


  }
  onChangeCeco(value) {

    this.subCentrosSeleccionado = this.subCentros.filter(item => {
      return item.idCeco == value
    })

  }

  onChangeServicio(value) {
    this.servicioSeleccionado = value
    this.guardar.idProgramaCecos = this.servicioSeleccionado
  }


  SeleccionarPUC(element) {
    const modalRef = this.modalService.open(PrerubrospucsComponent, { size: 'lg' });
    modalRef.componentInstance.rubrosPuc = this.pucs
    modalRef.result.then((result) => {
      this.pubGuardar = result;
      this.guardar.idRubroPucs = this.pubGuardar.id
     


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
   

    


  }

  ngOnInit(): void {

    //datos primera pantalla

    //IdPresupuesto
    var y: number = +this.route.snapshot.paramMap.get('id');
    this.programaRequest.idPresupuesto = y
    this.guardar.idPresupuesto = this.programaRequest.idPresupuesto
    this.getDetalle(null);
    this.presupuestoService.getDataInicial(this.programaRequest.idPresupuesto).subscribe(
      OK => {
        console.log(OK)
        this.programas = OK.programas[0]
        // this.programas.push(...OK.programas)
        this.centroCostos.push(...OK.cecos)

        this.subCentros = [];
        this.subCentros.push(...OK.presupuestoSubCeco)
        this.categorias = []
        this.categorias.push(...OK.categorias)
        // this.pucs = []
        // this.pucs.push(...OK.pucs)
        this.pucSeleccionados = []

        this.onChange(this.programas.id)


      },
      Error => { console.log(Error) },

    )

    //fin primera pantalla

    this.permitirGuardar = false;
    this.pucMostrar = [];
    this.pucMostrar.push(this.guardar);


    this.guardar.esNomina = this.datoRubro.esNomina;
    this.guardar.esPPTO = this.datoRubro.esppto;

    this.dataSource = new MatTableDataSource(this.pucMostrar);

    this.firstFormGroup = this._formBuilder.group({
      centroCostro: ['', Validators.required],

      Servicio: ['', Validators.required],

      Categoria: ['', Validators.required],


    });

    this.formgroupNomina = this._formBuilder.group({

      numeroIdentificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
      asignacion: ['', [Validators.max(100), Validators.min(1)]],
      cargo: ['', Validators.required],

    })
    this.formgroupFamiliar = this._formBuilder.group({

      NoCasa: ['', [Validators.max(15), Validators.min(1)]],
      NoKids: ['', [Validators.max(15), Validators.min(1)]],
    })

    this.formgroupNormal = this._formBuilder.group({

      // valor: ['',[Validators.min(1)]],
      Ingles: ['', Validators.nullValidator],
      detalleGasto: ['', Validators.required],
      valor: ['', Validators.nullValidator],




    })
  }




  updateUSAmount(event){
    this.valorMensual =  event.target.value;
    console.log( event.target.value)
 
  }

}
