import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Programa } from '../../../../models/programas/programas.response';
import { ProgramasService } from '../../../../services/programas.service';
import { RegistroexitosoComponent } from '../../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-gestionarprogramas',
  templateUrl: './gestionarprogramas.component.html',
  styleUrls: ['./gestionarprogramas.component.css']
})
export class GestionarprogramasComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'nombre', 'cobertura', 'tipoPrograma',
  'perNomina',  'perCapacitacion',
  'fechaCreacion', 'fechaActualizacion', 'estado',  'Ver'];
 dataSource: MatTableDataSource<Programa>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;
 programas: Programa[] = [];


 constructor(
   private servicePrograma:ProgramasService,
   private modalService: NgbModal) { 

 }

 openExitoso(){
   const modalRef = this.modalService.open(RegistroexitosoComponent,
      {size: 'md'});

   modalRef.result.then((result) => {
   
   
   }, (reason) => {
   
   
   });
 }


 

 cargaInicial(){
   this.servicePrograma.getProgramasUsuario().subscribe(
     OK => {
      console.log(OK)
       this.programas = [];
       this.programas.push(... OK.programas)
 
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
