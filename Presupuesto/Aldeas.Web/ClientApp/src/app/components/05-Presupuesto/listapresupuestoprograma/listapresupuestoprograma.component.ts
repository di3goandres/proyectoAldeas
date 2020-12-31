import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { PresupuestoListRequest, ProgramaL, PresupuestoL } from '../../../models/presupuesto/list.presupuesto.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenerarPresupuestoComponent } from '../generar-presupuesto/generar-presupuesto.component';
import { ActualizarPresupuestoComponent } from '../actualizar-presupuesto/actualizar-presupuesto.component';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { PresupuestoAnioResponse, PresupuestoAnioDatum } from '../../../models/presupuestoanio/anio.response';
import { AsociarfinanciadoranioComponent } from '../Gestion/asociarfinanciadoranio/asociarfinanciadoranio.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-listapresupuestoprograma',
  templateUrl: './listapresupuestoprograma.component.html',
  styleUrls: ['./listapresupuestoprograma.component.css']
})
export class ListapresupuestoprogramaComponent implements OnInit {
  PresupuestoSeleccionado: PresupuestoAnioDatum;
  response: PresupuestoAnioResponse;
  presupuestoResponse: PresupuestoAnioDatum[] = []
  programaRequest = new PresupuestoListRequest()
  programa: ProgramaL;
  presupuesto: PresupuestoL[];
  dataSource: MatTableDataSource<PresupuestoAnioDatum>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'anio',
    'nombrePrograma', 'tipoPrograma', 'Cobertura',
    'numeroVersion', 'per_nomina', 'per_capacitacion','Agregar', 'descargar'];

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(
    private route: ActivatedRoute,
    private service: PresupuestoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    var y: number = +this.route.snapshot.paramMap.get('id');
    this.programaRequest.idPresupuesto = y
    this.cargaInicial();
  }
  Actualizar(element) {
    const modalRef = this.modalService.open(ActualizarPresupuestoComponent, { size: 'md' });
    modalRef.componentInstance.programa = this.programa;
    modalRef.componentInstance.guardar = element;
    modalRef.result.then((result) => {
      if (result === "OK") {

        this.openExitoso();
        this.cargaInicial();

        // this.cargaInicial(true)
      }
      console.log('result', result);
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

  AbrirAsociarPresupuesto(element){
    const modalRef = this.modalService.open(AsociarfinanciadoranioComponent, { size: 'md' });

    modalRef.componentInstance.presupuesto = element;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial();
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  VerPresupuesto(element: PresupuestoAnioDatum){

    console.log(element)
    this.myStepper.next()

    this.PresupuestoSeleccionado = element;
  }
  AbrirCrearPresupuesto(element) {
    const modalRef = this.modalService.open(GenerarPresupuestoComponent, { size: 'md' });
    modalRef.componentInstance.programa = this.programa;
    modalRef.componentInstance.presupuesto = this.presupuestoResponse;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial();
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }




  async cargaInicial() {
    await this.service.getPresupuestoPrograma(this.programaRequest.idPresupuesto).subscribe(
      OK => {

        console.log(OK)
        this.presupuestoResponse = []

        
        this.presupuestoResponse = OK.presupuestoAnioData;
     
        this.programa = new ProgramaL();
        this.programa.nombre = OK.nombrePrograma
        this.programa.id = OK.idPrograma


        this.presupuestoResponse.forEach(item=>{
          item.urlReporte = this.service.gerReporte(item.id)

        })
        this.dataSource = new MatTableDataSource(this.presupuestoResponse);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      Error => { console.log(Error) },

    )
  }
}
