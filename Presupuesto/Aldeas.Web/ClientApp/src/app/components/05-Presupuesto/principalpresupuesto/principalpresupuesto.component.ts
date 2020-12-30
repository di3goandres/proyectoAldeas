import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { PresupuestoPrograma, PresupuestoCeco, PresupuestoSubCeco, PresupuestoCategoria, PresupuestoPuc } from '../../../models/presupuesto/data.presupuesto.response';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrerubrospucsComponent } from '../prerubrospucs/prerubrospucs.component';
import { AgregarpresupuestoComponent } from '../agregarpresupuesto/agregarpresupuesto.component';
import { PresupuestoRequest } from '../../../models/presupuesto/data.presupuesto.request';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoListRequest } from 'src/app/models/presupuesto/list.presupuesto.response';
import { DetallePresupuestoResponse, Detalle } from '../../../models/presupuesto/detalle.presupuesto.response';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-principalpresupuesto',
  templateUrl: './principalpresupuesto.component.html',
  styleUrls: ['./principalpresupuesto.component.css']
})
export class PrincipalpresupuestoComponent implements OnInit {

  /*
  detalle familiares
  */
  mostrar = false;
  dataSourceFamiliar: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'centroCosto',
    'subCentroCosto', 'nombreRubro', 'NoCasa', 'NoKids',
    'nombreCuenta', 'cuentaSIIGO', 'Enero', 'Febrero',
    'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'];
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
  guardar = new PresupuestoRequest();
  pucs: PresupuestoPuc[] = []
  pucSeleccionados: PresupuestoPuc[] = []
  pubGuardar = new PresupuestoPuc();
  idPrograma = 0;
  servicioSeleccionado = 0;






  constructor(
    private presupuestoService: PresupuestoService,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private modalService: NgbModal) { }


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


      console.log(result)

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
  AgregarPresupuesto() {


    const modalRef = this.modalService.open(AgregarpresupuestoComponent, { size: 'lg' });
    modalRef.componentInstance.datoRubro = this.categoriaSeleccionada;
    modalRef.componentInstance.dataPuc = this.pubGuardar;
    modalRef.componentInstance.guardar = this.guardar
    modalRef.result.then((result) => {
      this.guardar = result;


      this.openExitoso()
      this.getDetalle(null)
      this.getFamiliar();


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
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
    if(id== null){
      number = this.programaRequest.idPresupuesto
    }else{
      number = id;
    
    }
    this.presupuestoService.getDetallePresupuesto(number).subscribe(

      OK => {
        console.log(OK)
        this.dataSourcePresupuesto = []
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
  ngOnInit(): void {


    //IdPresupuesto se cambia por IdPresupuesto Anio.
    var y: number = +this.route.snapshot.paramMap.get('id');
    this.programaRequest.idPresupuesto = y
    this.guardar.idPresupuesto = this.programaRequest.idPresupuesto
    this.getDetalle(null);
    this.presupuestoService.getDataInicial(this.programaRequest.idPresupuesto).subscribe(
      OK => {
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

}
