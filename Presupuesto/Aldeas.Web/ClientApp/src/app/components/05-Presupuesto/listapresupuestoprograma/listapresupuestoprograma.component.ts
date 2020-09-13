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


@Component({
  selector: 'app-listapresupuestoprograma',
  templateUrl: './listapresupuestoprograma.component.html',
  styleUrls: ['./listapresupuestoprograma.component.css']
})
export class ListapresupuestoprogramaComponent implements OnInit {
  programaRequest = new PresupuestoListRequest()
  programa: ProgramaL;
  presupuesto: PresupuestoL[];
  dataSource: MatTableDataSource<PresupuestoL>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'id', 'anio',
  'coberturaAnual', 'coberturaMensual', 'coberturaMensualEsperada', 'coberturasCasas','update',  'Ver'];
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
  Actualizar(element){
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

  AbrirCrearPresupuesto(element){
    const modalRef = this.modalService.open(GenerarPresupuestoComponent, { size: 'md' });
    modalRef.componentInstance.programa = this.programa;
    modalRef.componentInstance.presupuesto = this.presupuesto;
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
  cargaInicial() {
    this.service.getPresupuestoByProgram(this.programaRequest).subscribe(
      OK => { 

      this.programa = OK.programa;
      this.presupuesto = []
      this.presupuesto = OK.presupuesto;  
      this.dataSource = new MatTableDataSource(this.presupuesto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      
      },
      Error => { console.log(Error) },

    )
  }
}
