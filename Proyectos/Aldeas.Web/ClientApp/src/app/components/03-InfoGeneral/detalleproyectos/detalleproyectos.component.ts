import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProyectoService } from 'src/app/services/proyectos/proyecto.service';
import { ItemProyectados, ItemFinanciera, ItemProyecto, ItemsEjecucion, ItemsFecha, ListParticipante, ItemsCentroCosto, ItemsMunicipio, ItemProyectadosRequest } from '../../../models/proyectos/proyecto.unico.response';
import { EjecucionFinancieraRequest } from '../../../models/proyectos/ejecucion.request';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizaritemproyectoComponent } from '../01-Actualizar/actualizaritemproyecto/actualizaritemproyecto.component';
import { ActualizariteminfofinancieraComponent } from '../01-Actualizar/actualizariteminfofinanciera/actualizariteminfofinanciera.component';
import { ActualizaritemparticipanteobservacionesComponent } from '../01-Actualizar/actualizaritemparticipanteobservaciones/actualizaritemparticipanteobservaciones.component';
import { CambiararchivoComponent } from '../cambiararchivo/cambiararchivo.component';


@Component({
  selector: 'app-detalleproyectos',
  templateUrl: './detalleproyectos.component.html',
  styleUrls: ['./detalleproyectos.component.css']
})
export class DetalleproyectosComponent implements OnInit {
  fechas: ItemsFecha[] = []
  itemProyecto: ItemProyecto;
  fechasMostrar$ = new BehaviorSubject(this.fechas);
  itemFinanciera: ItemFinanciera;
  itemsEjecucion: ItemsEjecucion[];
  displayedColumnsPROYECTO: string[] =
    ['position', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  itemProyectados: ItemProyectados;
  participantes: ListParticipante[];
  displayedColumnsParticipante: string[] =
    ['position', '0 - 5 Años', '6 - 12 años',
      '13 - 15 años', '18 - 24 años', '25 - 56 años',
      'Mayores de 60 años', 'Total', 'TotalDesagregado']

  itemsCentroCostos: ItemsCentroCosto[];
  itemsMunicipios: ItemsMunicipio[];
  idProyecto: string;
  default: "COMITES"
  secondFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public service: ProyectoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,



  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();

    this.secondFormGroup = this._formBuilder.group({


      proyecto: ['', Validators.required],




    });

  }

  onNotificar(event: boolean) {
    if (event) {
      this.cargaInicial();
    }
  }
  ActualizarArchivo(element: ItemProyecto){

    const modalRef = this.modalService.open(CambiararchivoComponent, { size: 'md' });
    modalRef.componentInstance.id = element.id.toString();
    
    modalRef.result.then((result) => {
      if (result === 'OK') {
        this.cargaInicial()
        this.registroExitoso() 
      }else if (result === 'NOK') {
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      }
    }, (reason) => {

     
    });

  }
  DescargarArchivo(element: ItemProyecto){

    this.service.getFileProyect(element.id, element.nombrearchivo);

  }
  cargaInicial() {
    this.service.getProyectosById(this.idProyecto).subscribe(
      OK => {
        console.log(OK)

        this.fechas = [];
        this.fechas.push(...OK.itemsFechas)

        this.itemProyecto = OK.itemProyecto

        this.itemFinanciera = OK.itemFinanciera;
        this.itemsEjecucion = [];
        this.itemsEjecucion = OK.itemsEjecucion;
        this.itemProyectados = OK.itemProyectados;
        this.participantes = [];
        this.participantes.push(...OK.itemProyectados.listParticipantes);
        this.itemsCentroCostos = [];
        this.itemsCentroCostos.push(...OK.itemsCentroCostos);
        this.itemsMunicipios = [];
        this.itemsMunicipios.push(...OK.itemsMunicipios);



        this.fechasMostrar$.next(this.fechas.filter(item => item.tipo_fecha.toUpperCase() == this.default));


        this.changeDetectorRefs.detectChanges();

      },
      ERROR => { console.log(ERROR) },
    )
  }


  cambioTab(event) {
    console.log(event.tab.textLabel)
    this.default = event.tab.textLabel
    this.fechasMostrar$.next(this.fechas.filter(item => item.tipo_fecha.toUpperCase() == this.default));


    this.changeDetectorRefs.detectChanges();

  }

  ejecucionUpdate = new EjecucionFinancieraRequest();
  ActualizarEjecucion() {

    this.ejecucionUpdate.ItemsEjecucion = [];
    this.ejecucionUpdate.ItemsEjecucion.push(...this.itemsEjecucion);

    this.service.ActualizarEjecucion(this.ejecucionUpdate).subscribe(
      OK => {  this.registroExitoso()  },
      ERROR => { 
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
        
        console.log(ERROR) },
    )
  }

  itemspartcipantes = new ItemProyectadosRequest();
  ActualizarListaparticipantes() {

    this.itemspartcipantes.ItemProyectados = new ItemProyectados();
    this.itemspartcipantes.ItemProyectados.listParticipantes = [];
    this.itemspartcipantes.ItemProyectados.listParticipantes.push(...this.participantes);

    this.service.ActualizarobserListParticipantes(this.itemspartcipantes).subscribe(
      OK => {  
        this.registroExitoso() 
       },
      ERROR => { 
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
        
        console.log(ERROR) },
    )
  }
  ActualizarItemProyecto( ){
    const modalRef = this.modalService.open(ActualizaritemproyectoComponent, { size: 'xl' });
    modalRef.componentInstance.infoProyecto = this.itemProyecto
    
    modalRef.result.then((result) => {
      if (result === 'OK') {
        this.cargaInicial()
       this.registroExitoso() 
      }else if (result === 'NOK') {
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      }
    }, (reason) => {

     
    });
  }
  ActualizarParticipanteObservaciones(){
    const modalRef = this.modalService.open(ActualizaritemparticipanteobservacionesComponent, { size: 'mg' });
    modalRef.componentInstance.itemProyectados = this.itemProyectados
    
    modalRef.result.then((result) => {
      if (result === 'OK') {
        this.cargaInicial()
       this.registroExitoso() 
      }else if (result === 'NOK') {
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      }
    }, (reason) => {

     
    });
  }

  ActualizarItemInfoFinanciera( ){
    const modalRef = this.modalService.open(ActualizariteminfofinancieraComponent, { size: 'xl' });
    modalRef.componentInstance.itemFinanciera = this.itemFinanciera
    
    modalRef.result.then((result) => {
      if (result === 'OK') {
        this.cargaInicial()
       this.registroExitoso() 
      }else if (result === 'NOK') {
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      }
    }, (reason) => {

     
    });
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
