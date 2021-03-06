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
import { CargosDatum } from '../../../../models/cargos/cargos';
import { CargoselectComponent } from '../../../07-Cargos/cargoselect/cargoselect.component';
import { MatStepper } from '@angular/material/stepper';
import { MatTabGroup } from '@angular/material/tabs';
import { PresupuestoAnioDatum } from 'src/app/models/presupuestoanio/anio.response';
import { CoberturaRequest } from 'src/app/models/cobertura/Cobertura.request';
import { PresupuestoCobertura } from '../../../../models/presupuestoanio/consulta.anio.response';
import { AsociarfinanciadoranioComponent } from '../asociarfinanciadoranio/asociarfinanciadoranio.component';

@Component({
  selector: 'app-asociaritemspresupuesto',
  templateUrl: './asociaritemspresupuesto.component.html',
  styleUrls: ['./asociaritemspresupuesto.component.css']
})
export class AsociaritemspresupuestoComponent implements OnInit {

  _id: number;
  _Anio: number;
  cobertura = new CoberturaRequest();

  tienecobertura = false;
  contratoNumber: any;
  Listacoberturas: PresupuestoCobertura[] = [];
  @Input() set id(value: PresupuestoAnioDatum) {

    console.log('Estamos Validando elemento', value[0])
    let elemento = value[0]

    if (elemento != null) {
      this.cobertura.idPrograma = elemento.idPrograma;
      this.cobertura.idPresupuestoAnio = elemento.id;

      this._id = elemento.id;
      this.programaRequest.idPresupuesto = this._id
      this._Anio = elemento.anio

      this.tienecobertura = elemento.cobertura;

      // console.log('Estamos Validando', this._id)

      this.guardar.idPresupuesto = this.programaRequest.idPresupuesto
      if (this._id != null && this._id != 0) {
        this.getDetalle(0);
        this.datosIniciales();
      }
    }

  }
  MostrarExitoso = false;
  Guardando = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Manual = false;

  /**infro de la primera pantalla */

  /*
  detalle familiares
  */
  mostrar = false;
  dataSourceFamiliar: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  @ViewChild('tableFamiliar') tableFamilia: MatTable<Detalle>;
  @ViewChild('stepper2') private myStepper: MatStepper;
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

  yourFn(event) {
    console.log(event.index)
    if (event.index == 1) {
      this.Manual = true;
      this.valorMensual = 0;
      this.dejarEncerosManual()

    } else {
      this.Manual = false;
    }

  }
  tabActivo(data) {
    // console.log(data)

    // if(data){
    //   this.valorMensual =0;
    // }
    // this.Manual = data;
    // console.log(this.Manual)
  }

  Notificar(event: boolean) {

    this.getDetalle(null);
  }
  onNotificar(event: Task, Tipo: any) {
    console.log('ando notificando algo');
    if(!this.Manual){
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
  



  }

  Cambiar() {
    this.guardar.Total = this.valorMensual;
    this.onNotificar(this.presupuestoCheck, "")
    this.CalcularPorcentaje();

  }

  Actualizar() {

    this.pucMostrar = [];


    this.pucMostrar.push(this.guardar);
    this.dataSource = new MatTableDataSource(this.pucMostrar);
    this.validarFomularios();
    this.calcularValorAnual();
    this.CalcularPorcentaje();



  }

  dejarEncerosManual()
  {
   
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
  dejarEnceros() {
    console.log("entre a dejar en ceros")
    if (!this.Manual) {
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

  }




  calcularValorAnual() {

    this.valorMensual = this.guardar.Enero +
      this.guardar.Febrero +
      this.guardar.Marzo +
      this.guardar.Abril +
      this.guardar.Mayo +
      this.guardar.Junio +
      this.guardar.Julio +
      this.guardar.Agosto +
      this.guardar.Septiembre +
      this.guardar.Octubre +
      this.guardar.Noviembre +
      this.guardar.Diciembre;

    this.guardar.Total = this.valorMensual;


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

  CalcularPorcentaje() {
    console.log(this.guardar.Asignacion)
    if (this.guardar.Asignacion != undefined &&  this.guardar.Asignacion!= 0) {
      this.guardar.TotalAnual = (this.guardar.Total * this.guardar.Asignacion) / 100
    } else {
      this.guardar.TotalAnual = 0;
    }

    this.validarFomularios();
  }

  validarFomularios() {
    if (this.tabGroup != null) {
      console.log(this.tabGroup.selectedIndex);

      if (this.tabGroup.selectedIndex == 1) {
        if (this.datoRubro.esNomina) {
          this.permitirGuardar = this.formgroupNomina.valid && this.formgroupNormal.valid
          if (this.permitirGuardar && this.guardar.Cargo == 0) {
            this.permitirGuardar = false;
          }
          console.log(this.permitirGuardar);

        }
        if (this.datoRubro.esppto) {
          this.permitirGuardar = this.formgroupFamiliar.valid && this.formgroupNormal.valid

        }
        if (this.datoRubro.esppto == false && this.datoRubro.esNomina == false) {
          this.permitirGuardar = this.formgroupNormal.valid

        }
      } else {
        let seleccionados = this.presupuestoCheck.subtasks.filter(t => {
          return t.completed == true;
        });

        let numeroMeses = seleccionados.length;
        if (this.datoRubro.esNomina) {
          this.permitirGuardar = this.formgroupNomina.valid && this.formgroupNormal.valid && numeroMeses > 0
          if (this.permitirGuardar && this.guardar.Cargo == 0) {
            this.permitirGuardar = false;
          }
          console.log(this.permitirGuardar);
        }
        if (this.datoRubro.esppto) {
          this.permitirGuardar = this.formgroupFamiliar.valid && this.formgroupNormal.valid && numeroMeses > 0

        }
        if (this.datoRubro.esppto == false && this.datoRubro.esNomina == false) {
          this.permitirGuardar = this.formgroupNormal.valid && numeroMeses > 0

        }
      }
    }




  }




  guardarData() {
    this.guardar.esNomina = this.datoRubro.esNomina;
    this.guardar.esPPTO = this.datoRubro.esppto;

    this.callServiceCobertura();
    /// Preguntar Si es con cobertura o NO



  }

  callServiceSinCobertura() {
    console.log(this.guardar);
    this.presupuestoService.guardarPresupuesto(this.guardar).subscribe(
      OK => {

        this.presupuestoService.Exitoso()
        this.getDetalle(null)
        this.getFamiliar();
        this.clearFormularios();

      },
      Error => {
        console.log(Error)
        this.presupuestoService.NoExitoso("Error", "Ha ocurrido un error inesperado, por favor intentelo nuevamente.")

      },

    )
  }
  callServiceCobertura() {
    console.log(this.guardar);
    this.guardar.Total = 0;
    this.presupuestoService.guardarPresupuesto(this.guardar).subscribe(
      OK => {

        this.presupuestoService.Exitoso()
        this.getDetalle(null)
        this.getFamiliar();
        this.clearFormularios();

      },
      Error => {
        console.log(Error)
        this.presupuestoService.NoExitoso("Error", "Ha ocurrido un error inesperado, por favor intentelo nuevamente.")

      },

    )
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
    console.log(id);
    this.dataSourcePresupuesto = []
    if (id == null) {
      number = this.programaRequest.idPresupuesto
    } else {
      number = id;

    }
    this.presupuestoService.getDetallePresupuesto(number).subscribe(

      OK => {
        console.log(OK);
        this.dataSourcePresupuesto = []
        if (OK.detallePresupuesto != null)
          this.dataSourcePresupuesto.push(...OK.detallePresupuesto)

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

    this.datoRubro = this.categoriaSeleccionada;

    this.pubGuardar.id = 0;

    this.getPucsRubro(value)



  }
  onChangeCeco(value) {
    this.subCentrosSeleccionado = [];
    this.subCentrosSeleccionado = this.subCentros.filter(item => {
      return item.idCeco == value
    })

    this.Listacoberturas = [];

  }

  onChangeServicio(value) {
    this.servicioSeleccionado = value
    this.guardar.idProgramaCecos = this.servicioSeleccionado

    this.cobertura.idCeco = value;
    this.Listacoberturas = [];

    this.consultarCoberturas();
  }


  consultarCoberturas() {

    //Si tien Cobertura, se debe pedir la seleccion del contrato y permitir crear el contrato o editarlo
    // if (this.tienecobertura) {
    this.presupuestoService.getCoberturas(this.cobertura).subscribe(
      OK => {
        console.log(OK)
        if (this.tienecobertura) {

          if (OK.presupuesto.length == 0) {
            this.presupuestoService.MostrarSnack("No se ha registrado contrato/Cobertura para esta servicio, debes asociarlo.")
          } else {
            this.Listacoberturas = [];
            this.Listacoberturas.push(...OK.presupuesto)
          }
        } else {
          this.Listacoberturas.push(...OK.presupuesto)
          this.AsociarPresupuesto(this.Listacoberturas[0].id)
        }
      },
      ERROR => {
        console.log(ERROR)
        this.presupuestoService.NoExitoso("Error", "Ha ocurrido un error inesperado, por favor intentelo nuevamente.")
      },

    )
    // }
  }

  datoCargo = new CargosDatum();
  SeleccionarCargo() {
    const modalRef = this.modalService.open(CargoselectComponent, { size: 'lg' });

    modalRef.result.then((result: CargosDatum) => {
      this.datoCargo = result;
      this.guardar.Cargo = result.id;
      this.guardar.idRubroPucs = this.pubGuardar.id
      console.log('diego')
      this.validarFomularios();



    }, (reason) => {

      if (reason === 'OK') {


      }
    });
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




  datosIniciales() {
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
  }

  AbrirAsociarPresupuesto(element) {
    const modalRef = this.modalService.open(AsociarfinanciadoranioComponent, { size: 'md' });

    modalRef.componentInstance.presupuesto = this.cobertura;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.presupuestoService.Exitoso()
        this.consultarCoberturas();
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  AsociarPresupuesto(value: number) {
    this.guardar.idPresupuesto = value;
    this.programaRequest.idPresupuesto = value;
    this.contratoNumber = value;
    console.log(this.guardar);
    this.getDetalle(value);


  }
  ngOnInit(): void {

    //datos primera pantalla

    //IdPresupuesto
    var y: number = this._id//+this.route.snapshot.paramMap.get('id');
    // this.programaRequest.idPresupuesto = y
    // this.guardar.idPresupuesto = this.programaRequest.idPresupuesto
    // this.getDetalle(null);
    // this.datosIniciales();

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

      Cobertura: ['', Validators.nullValidator]


    });

    this.formgroupNomina = this._formBuilder.group({

      numeroIdentificacion: ['', [Validators.min(1), Validators.required]],
      Nombre: ['', Validators.required],
      asignacion: ['', [Validators.max(100), Validators.min(1)]],
      // cargo: ['', [Validators.required]],


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



  clearFormularios() {
    this.formgroupFamiliar.reset();
    this.formgroupNormal.reset();
    this.formgroupNomina.reset();
    // this.firstFormGroup.reset();
    this.datoCargo = new CargosDatum();
    // this.myStepper.reset();

    this.myStepper.previous();
  }

  Atras() {
    this.myStepper.previous();
  }
  updateUSAmount(event) {
    this.valorMensual = event.target.value;


  }

  return(event) {
    event.target.value;


  }

}
