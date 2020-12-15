import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto, FechaElement, MunicipioSeleccionado, Financiera, Participantes, Ejecucion, Proyectados, Otros, CentroCostosList } from '../../../models/proyect';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { ConsultaDepartamentos, Municipio, Departamento } from '../../../models/ConsultaDepartamentos';
import { CentrosCosto, SubCentro } from '../../../models/comunes';
import { Task } from 'src/app/models/checkbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';

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
  @ViewChild('desebolsos') tableDesembolsos: MatTable<any>;
  @ViewChild('vistantes') tablevistantes: MatTable<any>;
  @ViewChild('otros') tableOtros: MatTable<any>;
  @ViewChild('otros') participantesTable: MatTable<any>;


  ValidarArchivo: boolean = false;
  contentInclude = "application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  fileToUpload: File = null;

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;
  displayedOtros: string[] = ['position','Tipo', 'Total', 'otroPorcentaje', 'Quitar'];

  displayedColumns: string[] = ['position', 'Fecha', 'Quitar'];
  displayedColumnsDepartamento: string[] = ['position', 'Departamento', 'Municipio', 'Quitar'];
  displayedColumnsPROYECTO: string[] =
    ['position', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  displayedColumnsParticipante: string[] =
    ['position', '0 - 5 Años', '6 - 12 años',
      '13 - 15 años', '18 - 24 años', '25 - 56 años',
      'Mayores de 60 años', 'Total', 'TotalDesagregado']
  dataSourceComites: FechaElement[] = [];
  dataSourceInformes: FechaElement[] = [];
  dataSourceDesembolsos: FechaElement[] = [];
  dataSourceVisita: FechaElement[] = [];
  dataSourceOtros: Otros[]=[];
  otroItem: Otros= new Otros("", 0, 0);
  dataSourcemunicipio: MunicipioSeleccionado[] = [];

  Fuente: Select[] = [
    { value: 'CONTRAPARTIDA', viewValue: 'CONTRAPARTIDA' },
    { value: 'APORTE DEL DONANTE', viewValue: 'APORTE DEL DONANTE' },

  ];
  TipoFuente: Select[] = [
    { value: 'EFECTIVO', viewValue: 'EFECTIVO' },
    { value: 'ESPECIE', viewValue: 'ESPECIE' },

  ];
  tipoImplementacion: Select[] = [
    { value: 'PROGRAMA', viewValue: 'PROGRAMA' },
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
  mondea: string;
  monedaChecK: Task[] = [
    {id:0,pregunta: 'MONEDA', name: 'USD', completed: false, esOtro: false, color: 'primary' },
    {id:0,pregunta: 'MONEDA', name: 'EURO', completed: false, esOtro: false, color: 'primary' },
    {id:0,pregunta: 'MONEDA', name: 'COP', completed: false, esOtro: false, color: 'primary' },
    {id:0,pregunta: 'MONEDA', name: 'Otra', completed: false, esOtro: true, color: 'primary' },
  ]
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  tiempo: number;
  previousDate: Date;
  FechaComite: Date;
  FechaInformes: Date;
  FechaDesembolso: Date;
  FechaVisita: Date;


  AgregarDesembolso: boolean;
  AgregarVisita: boolean;


  AgregarInfome: boolean;
  AgregarMuni: boolean;
  validarNextPantalla_1: boolean;
  validarNextPantalla_2: boolean;
  ValidarMoneda: boolean = false;

  validarDepartamentos: boolean;
  ValidarReuniones: boolean;
  ValidarInformes: boolean;
  ValidarDesembolsos: boolean;
  ValidarVisitas: boolean;



  agregarComite: boolean;
  infoProyecto: Proyecto;
  infoFinanciera: Financiera;
  infoProyectados: Proyectados;
  objetoColombia: ConsultaDepartamentos;
  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];

  centrosCostos: CentrosCosto[] = [];
  subCentro: SubCentro[] = [];
  subCentroSeleccionado: SubCentro[] = [];

  codigoDepartamento: number;
  codigoMunicipio: number;
  ejecucion: Ejecucion[] = [];
  participantes: Participantes[] = [];



  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
    private modalService: NgbModal,
  ) {
    this.FechaComite = new Date();
    this.FechaDesembolso = new Date()
    this.agregarComite = true;
    this.AgregarDesembolso = true;
    this.FechaInformes = new Date();
    this.AgregarInfome = true;
    this.FechaVisita = new Date();
    this.AgregarVisita = true;


    this.ejecucion.push(new Ejecucion("EJECUCION DEL PROYECTO"));
    this.ejecucion.push(new Ejecucion("RECUPERACIÓN DEL PROYECTO"));
    this.participantes.push(new Participantes("MUJERES"))
    this.participantes.push(new Participantes("HOMBRES"))
    this.participantes.push(new Participantes("OTROS"))

  }
  datediff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
  datediffday(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }


  AgregarFechaInforme() {


    let conteo = this.dataSourceInformes.length + 1
    let nuevo = new FechaElement(
      this.FechaInformes,
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

  agregarVisita() {

    let conteo = this.dataSourceVisita.length + 1
    let nuevo = new FechaElement(
      this.FechaDesembolso,
      conteo
    );
    this.dataSourceVisita.push(nuevo);
    this.tablevistantes.renderRows();

    if (conteo === 5) {
      this.AgregarVisita = false;

    }
    //this.ValidarVisitas = true;
    this.continuarPanatalla_2()

  }

  agregarFechaDesembolso() {

    let conteo = this.dataSourceDesembolsos.length + 1
    let nuevo = new FechaElement(
      this.FechaDesembolso,
      conteo
    );
    this.dataSourceDesembolsos.push(nuevo);
    this.tableDesembolsos.renderRows();

    if (this.dataSourceDesembolsos.length === 0) {
      this.ValidarDesembolsos = false;
    } else {
      this.ValidarDesembolsos = true
    }
    if (conteo === 5) {
      this.AgregarDesembolso = false;

    }
    this.continuarPanatalla_2()


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


  eliminarVisita(listafecha: FechaElement) {


    this.dataSourceVisita = this.dataSourceVisita.filter(fecha => {
      return fecha.position !== listafecha.position;
    });

    let conteo = this.dataSourceVisita.length
    let conteointerno = 0;
    this.dataSourceVisita.forEach(item => {
      conteointerno += 1;
      item.position = conteointerno
    })
    this.tablevistantes.renderRows();

    if (this.dataSourceVisita.length === 0) {
      this.ValidarVisitas = false;
    } else {
      this.ValidarVisitas = true
    }
    if (5 > conteo) {
      this.AgregarVisita = true;

    }
    this.continuarPanatalla_2();


  }

  eliminarDesembolso(listafecha: FechaElement) {


    this.dataSourceDesembolsos = this.dataSourceDesembolsos.filter(fecha => {
      return fecha.position !== listafecha.position;
    });

    let conteo = this.dataSourceDesembolsos.length
    let conteointerno = 0;
    this.dataSourceDesembolsos.forEach(item => {
      conteointerno += 1;
      item.position = conteointerno
    })
    this.tableDesembolsos.renderRows();

    if (this.dataSourceDesembolsos.length === 0) {
      this.ValidarDesembolsos = false;
    } else {
      this.ValidarDesembolsos = true
    }
    if (5 > conteo) {
      this.AgregarDesembolso = true;

    }
    this.continuarPanatalla_2()

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

    if (this.dataSourceComites.length === 0) {
      this.ValidarReuniones = false;
    } else {
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



    if (this.dataSourceInformes.length === 0) {
      this.ValidarInformes = false;
    } else {
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

  cambioVisita(event) {

    var fecha = moment(this.FechaDesembolso);
    if (fecha.isValid()) {
      this.AgregarDesembolso = true;
    } else {
      this.AgregarDesembolso = false;

    }

  }

  cambioDesembolso(event) {

    var fecha = moment(this.FechaDesembolso);
    if (fecha.isValid()) {
      this.AgregarDesembolso = true;
    } else {
      this.AgregarDesembolso = false;

    }

  }
  calcularDias() {

    var firstDate = moment(this.infoProyecto.FechaInicio);
    var secondDate = moment(this.infoProyecto.FechaFinalizacion);



    if (firstDate.isValid() && secondDate.isValid()) {
      if (firstDate.toDate() > secondDate.toDate()) {
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

  cambioCentroCosto(id) {

    this.subCentroSeleccionado = this.subCentro.filter(item => {
      return item.codigoCentro === id;
    });

  }
  traerCentrosCostos() {
    this.userService.getCentrosResponse().subscribe(
      response => {

        this.centrosCostos.push(...response.centrosCostos)
        this.subCentro.push(...response.subCentro)



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

  continuarPanatalla_2() {

    this.ValidarVisitas=true;
    if (this.ValidarDesembolsos && this.ValidarVisitas && this.ValidarArchivo
       && this.ValidarMoneda && this.validarCentroCosto) {
      this.validarNextPantalla_2 = false;
    } else {
      this.validarNextPantalla_2 = true;

    }
  }
  Guardando: boolean = false;
  onGuardar() {
    this.Guardando = true;
    this.infoProyecto.FechasInformes = [];
    this.infoProyecto.FechasComites = [];
    this.infoProyecto.Municipio = [];
    this.infoFinanciera.Desembolsos = [];
    this.infoProyecto.ListaEjecucion = [];
    this.infoFinanciera.Visitas =  [];
    this.infoProyectados.ListaParticipantes = [];
    this.infoProyectados.OtrosParticipantes =[];



    this.infoProyecto.FechasInformes.push(... this.dataSourceInformes);
    this.infoProyecto.FechasComites.push(... this.dataSourceComites);
    this.infoProyecto.Municipio.push(...this.dataSourcemunicipio)
    this.infoFinanciera.Desembolsos.push(... this.dataSourceDesembolsos)


    this.infoFinanciera.Visitas.push(...this.dataSourceVisita);
    this.infoProyecto.infoFinanciera = this.infoFinanciera;
    //dats de ejecucion y recuperacion
    this.infoProyecto.ListaEjecucion.push(... this.ejecucion);
    this.infoProyectados.ListaParticipantes.push(...this.participantes);
    this.infoProyectados.OtrosParticipantes.push(...this.dataSourceOtros);
    this.infoProyecto.ParticiProyectados = this.infoProyectados;

    this.userService.guardarRegistroProyecto(this.infoProyecto).subscribe(
      response => {

        if(response.status=="OK"){
          
          this.guardarArchivo(response.id)
         
        }
       
      },
      error => {
        console.log(error)
        this.Guardando = false;

      },

    )
  }
  guardarArchivo(id){
    this.userService.postFile(this.fileToUpload, id)
    .subscribe(
      response => {
       console.log(response);
       if(response.status == "OK"){
        this.registroExitoso();
        this.reiniciar();
       }
      },
      error => {
        this.registroNoExitoso("Error", error);
        console.log(error)
        this.Guardando = false;
      },

    )
  }
  MostrarExitoso: boolean = false;
  reiniciar(){
    
    this.MostrarExitoso = true
    this.Guardando = false;
    this.infoProyecto =new Proyecto();
    this.infoFinanciera = new Financiera();
    this.infoProyectados = new Proyectados();
    this.dataSourceInformes = [];
    this.dataSourceComites = [];
    this.dataSourcemunicipio = [];
    this.dataSourceDesembolsos = [];
    this.dataSourceVisita = [];

  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.ValidarArchivo = true;

      this.fileToUpload = files.item(0);

    } else {
      this.ValidarArchivo = false;

    }

    this.continuarPanatalla_2();
  }
  otroTipo:string =""
  otroTotal:number=0;
  otroPorcentaje: number =0;
  AgregarOtro(){

   this.dataSourceOtros
    .push(
      new Otros(
        this.otroTipo,
        this.otroTotal,
        this.otroPorcentaje)
   )
   this.otroTipo =""
   this.otroTotal =0;
   this.otroPorcentaje =0;
   this.tableOtros.renderRows();
  }

  eliminarOtro(element: Otros){
    let index = this.dataSourceOtros.indexOf(element);
    this.dataSourceOtros.splice(index, 1);
   this.tableOtros.renderRows();

  }
  onNotificar(event: Task, Tipo: any) {
    this.verificarMoneda(event);
  }

  validarCentroCosto: boolean =false;
  onNotificarCentroCosto(list: CentroCostosList[]){

    if(list.length === 0){
      this.validarCentroCosto = false;
    }else{
      this.validarCentroCosto = true;

    }
    this.infoFinanciera.ListCentroCostos = [];
    this.infoFinanciera.ListCentroCostos.push(...list) 
    this.continuarPanatalla_2()
  }


  verificarMoneda(event: Task) {
      if (event.esOtro) {
        this.ValidarMoneda = event.formValid;
        this.infoFinanciera.MonedaDonacion = event.valorOtro
      } else {
        this.ValidarMoneda = true;
        this.infoFinanciera.MonedaDonacion = event.name
      }
      this.continuarPanatalla_2()
  }
  actualizar(){
   
    this.participantes.forEach(
    
      t =>{
        t.Total =
              t.Rango_13_17 +
              t.Rango_18_24+
              t.Rango_25_56 
              + t.Rango_6_12 
              + t.Mayores_60 
              + t.Rango_0_5;
      
      });

      this.participantesTable.renderRows()
    
   
  }
  ngOnInit(): void {
    this.AgregarMuni = true;
    this.validarNextPantalla_1 = true;
    this.validarNextPantalla_2 = true;
    this.validarDepartamentos = false;
    this.ValidarReuniones = false;
    this.ValidarInformes = false
    this.ValidarDesembolsos = false;
    this.ValidarVisitas = false;
    this.infoProyecto = new Proyecto();
    this.infoFinanciera = new Financiera();
    this.infoProyectados = new Proyectados();
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

      CostoTotal: ['', Validators.required],
      valorContrapartida:  ['', Validators.required],
      valorDonante: ['', Validators.required],
      Fuente: ['', Validators.required],
      TipoFuente: ['', Validators.required],
      TasaCambio: ['', Validators.required],
      Cuenta: ['', Validators.required],
    
      Navision: ['', Validators.required],
      fechas: ['', Validators.required],
      responsable: ['', Validators.nullValidator],
      lugar: ['', Validators.nullValidator],
      proyecto: ['', Validators.required],
    



    });
    this.thirdFormGroup = this._formBuilder.group({

     
      totalFamilias: ['', Validators.required],
      Observaciones: ['', Validators.required],
      TipoP: ['', Validators.nullValidator],
      TotalP: ['', Validators.nullValidator],

      Porcentaje: ['', Validators.nullValidator],


    });

    this.traerDepartamentos();
 

  }

  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
       this.reiniciar()
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
