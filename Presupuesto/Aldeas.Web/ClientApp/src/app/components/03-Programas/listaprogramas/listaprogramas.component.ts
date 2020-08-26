import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramasService } from '../../../services/programas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Programa, Ceco } from 'src/app/models/programas/programas.response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearprogramaComponent } from '../crearprograma/crearprograma.component';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';


@Component({
  selector: 'app-listaprogramas',
  templateUrl: './listaprogramas.component.html',
  styleUrls: ['./listaprogramas.component.css']
})
export class ListaprogramasComponent implements OnInit {

  displayedColumns: string[] = [ 'codigoCeco', 'nombre',
   'subCentro', 'nombreSubCentro', 'facilityNav', 'estado'];
  dataSource: MatTableDataSource<Ceco>;
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
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {
     
       
      }
    });
  }
  onChange(value){
 
   let nuevos  = this.cecos.filter(item => {
     return  item.idPrograma == value;
    })
    
    this.dataSource = new MatTableDataSource(nuevos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  cargaInicial(){
    this.servicePrograma.getProgramas().subscribe(
      OK => {
      
        this.programas = [];
        this.programas.push(... OK.programas)
        this.cecos = [];
        this.cecos.push(... OK.cecos)

      },
      Errr => {console.log(Errr)}

    )
  }
  ngOnInit(): void {
  this. cargaInicial();

 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

