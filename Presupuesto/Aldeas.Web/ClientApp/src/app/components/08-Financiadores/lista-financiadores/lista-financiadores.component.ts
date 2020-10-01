import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanciadoresDatum } from 'src/app/models/financiadores/financiadores.response';
import { ProgramasService } from 'src/app/services/programas.service';

@Component({
  selector: 'app-lista-financiadores',
  templateUrl: './lista-financiadores.component.html',
  styleUrls: ['./lista-financiadores.component.css']
})
export class ListaFinanciadoresComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'nombre', 'estado',
  'fechaCreacion', 'fechaActualizacion'];
 dataSource: MatTableDataSource<FinanciadoresDatum>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;
 financiadores: FinanciadoresDatum[] = [];


 constructor(
   private servicePrograma:ProgramasService,
  ) { 

 }
 cargaInicial(){
   this.servicePrograma.getFinanciadores().subscribe(
     OK => {
      console.log(OK)
       this.financiadores = [];
       this.financiadores.push(... OK.financiadoresData)
   
       this.dataSource = new MatTableDataSource(this.financiadores);
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
