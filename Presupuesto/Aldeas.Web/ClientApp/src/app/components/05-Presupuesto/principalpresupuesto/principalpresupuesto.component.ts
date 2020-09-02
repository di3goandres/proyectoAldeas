import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-principalpresupuesto',
  templateUrl: './principalpresupuesto.component.html',
  styleUrls: ['./principalpresupuesto.component.css']
})
export class PrincipalpresupuestoComponent implements OnInit {
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

    private modalService: NgbModal) { }


  onChange(value) {
    this.idPrograma = value
    this.subCentrosSeleccionado = []
    this.centroCostosSeleccionado = this.centroCostos.filter(item => {
      return item.idPrograma == value
    })
  }

  onChangeCategoria(value) {


    this.pubGuardar = new PresupuestoPuc();
    this.pucSeleccionados = this.pucs.filter(item => {
      return item.idCategoria == value
    })

    this.categoriaSeleccionada = this.categorias.find(item => {
      return item.id == value;
    })

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
    modalRef.componentInstance.rubrosPuc = this.pucSeleccionados
    modalRef.result.then((result) => {
      this.pubGuardar = result;
      this.guardar.idRubroPucs = this.pubGuardar.id
      
    
      console.log(result)

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  openExitoso(){
    const modalRef = this.modalService.open(RegistroexitosoComponent,
       {size: 'md'});
   
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
      this.getDetalle() 
    


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  getDetalle() {
    this.presupuestoService.getDetallePresupuesto(this.programaRequest.idPresupuesto).subscribe(
     
      OK => {
        console.log(OK)
        this.dataSourcePresupuesto = []
        this.dataSourcePresupuesto.push(...OK.detallePresupuesto)
       },
      Error => { console.log(Error) },

    )
  }
  ngOnInit(): void {
    var y: number = +this.route.snapshot.paramMap.get('id');
    this.programaRequest.idPresupuesto = y
    this.guardar.idPresupuesto = this.programaRequest.idPresupuesto

    this.presupuestoService.getDataInicial(this.programaRequest.idPresupuesto).subscribe(
      OK => {
        this.programas = OK.programas[0]
        // this.programas.push(...OK.programas)
        this.centroCostos.push(...OK.cecos)

        this.subCentros = [];
        this.subCentros.push(...OK.presupuestoSubCeco)
        this.categorias = []
        this.categorias.push(...OK.categorias)
        this.pucs = []
        this.pucs.push(...OK.pucs)
        this.pucSeleccionados = []

        this.onChange(this.programas.id)
        this.getDetalle();
      },
      Error => { console.log(Error) },

    )

  }

}
