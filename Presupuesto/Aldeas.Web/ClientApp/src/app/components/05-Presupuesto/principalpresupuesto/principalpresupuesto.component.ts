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

@Component({
  selector: 'app-principalpresupuesto',
  templateUrl: './principalpresupuesto.component.html',
  styleUrls: ['./principalpresupuesto.component.css']
})
export class PrincipalpresupuestoComponent implements OnInit {
  myControl = new FormControl();
  programas: PresupuestoPrograma[] = []
  centroCostos: PresupuestoCeco[] = []
  centroCostosSeleccionado: PresupuestoCeco[] = []
  subCentros: PresupuestoSubCeco[] = []
  subCentrosSeleccionado: PresupuestoSubCeco[] = []

  categorias: PresupuestoCategoria[] = []
  categoriaSeleccionada: PresupuestoCategoria;
  guardar = new PresupuestoRequest();
  pucs: PresupuestoPuc[] = []
  pucSeleccionados: PresupuestoPuc[] = []
  pubGuardar= new PresupuestoPuc() ; 
  idPrograma = 0;
  servicioSeleccionado = 0;






  constructor(
    private presupuestoService: PresupuestoService,
    private modalService: NgbModal) { }


  onChange(value) {
    this.idPrograma = value
    this.subCentrosSeleccionado = []
    this.centroCostosSeleccionado = this.centroCostos.filter(item => {
      return item.idPrograma == value
    })
  }

  onChangeCategoria(value) {


    this.pubGuardar= new PresupuestoPuc() ;  
    this.pucSeleccionados = this.pucs.filter(item => {
      return item.idCategoria == value
    })

    this.categoriaSeleccionada = this.categorias.find(item => {
      return item.id== value;
    })
 
  }
  onChangeCeco(value) {
 
    this.subCentrosSeleccionado = this.subCentros.filter(item => {
      return item.idCeco == value
    })
  
  }

  onChangeServicio(value){
    this.servicioSeleccionado = value
  }
 

  SeleccionarPUC(element){
    const modalRef = this.modalService.open(PrerubrospucsComponent, {size: 'lg'});
    modalRef.componentInstance.rubrosPuc =this.pucSeleccionados
    modalRef.result.then((result) => {
      this.pubGuardar = result;
      console.log(result)
     
    }, (reason) => {
     
      if (reason === 'OK') {
     
       
      }
    });
  }

  AgregarPresupuesto(){
    this.guardar.idPresupuesto =  this.idPrograma


    const modalRef = this.modalService.open(AgregarpresupuestoComponent, {size: 'lg'});
    modalRef.componentInstance.datoRubro =this.categoriaSeleccionada;
    modalRef.componentInstance.dataPuc =this.pubGuardar  ;
    modalRef.result.then((result) => {
      this.guardar = result;
     
   


      console.log( this.guardar)

     
    }, (reason) => {
     
      if (reason === 'OK') {
     
       
      }
    });
  }



  ngOnInit(): void {

    
    this.presupuestoService.getDataInicial().subscribe(
      OK => {
        this.programas = []
        this.programas.push(...OK.programas)
        this.centroCostos.push(...OK.cecos)

        this.subCentros = [];
        this.subCentros.push(...OK.presupuestoSubCeco)
        this.categorias = []
        this.categorias.push(...OK.categorias)
        this.pucs = []
        this.pucs.push(...OK.pucs)
        this.pucSeleccionados = []


        console.log(OK)
      },
      Error => { console.log(Error) },

    )

  }

}
