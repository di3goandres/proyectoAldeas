import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Programa, Ceco } from 'src/app/models/programas/programas.response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from 'src/app/services/programas.service';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { ActualizarprogramaComponent } from '../actualizarprograma/actualizarprograma.component';
import { CrearprogramaComponent } from '../crearprograma/crearprograma.component';

@Component({
  selector: 'app-listaonlyprograma',
  templateUrl: './listaonlyprograma.component.html',
  styleUrls: ['./listaonlyprograma.component.css']
})
export class ListaonlyprogramaComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'nombre',
  'fechaCreacion', 'fechaActualizacion', 'estado', 'Actualizar'];
 dataSource: MatTableDataSource<Programa>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;
 programas: Programa[] = [];
 cecos: Ceco[] = [];

 constructor(
   private servicePrograma:ProgramasService,
   private modalService: NgbModal) { 

 }

 openExitoso(){
   const modalRef = this.modalService.open(RegistroexitosoComponent,
      {size: 'md'});
   modalRef.componentInstance.Actuales =this.cecos
   modalRef.result.then((result) => {
   
   
   }, (reason) => {
   
   
   });
 }

 openActualizar(element){
   const modalRef = this.modalService.open(ActualizarprogramaComponent, {size: 'md'});
   modalRef.componentInstance.programa =element
   modalRef.result.then((result) => {
     if(result==="OK"){
       this.openExitoso();
       this.cargaInicial()
     }
    
   }, (reason) => {
    
     if (reason === 'OK') {
    
      
     }
   });
 }
 
 openCrear(){

   const modalRef = this.modalService.open(CrearprogramaComponent, {size: 'lg'});
   modalRef.componentInstance.Actuales =this.cecos
   modalRef.result.then((result) => {
     if(result==="OK"){
       this.openExitoso();
       this.cargaInicial()
     }
     console.log('result', result);
   }, (reason) => {
    
     if (reason === 'OK') {
    
      
     }
   });
 }

 cargaInicial(){
   this.servicePrograma.getProgramas().subscribe(
     OK => {
     
       this.programas = [];
       this.programas.push(... OK.programas)
       this.cecos = [];
       this.cecos.push(... OK.cecos)
       this.dataSource = new MatTableDataSource(this.programas);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort

     },
     Errr => {console.log(Errr)}

   )
 }
 ngOnInit(): void {
 this.cargaInicial();


 }
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }


}
