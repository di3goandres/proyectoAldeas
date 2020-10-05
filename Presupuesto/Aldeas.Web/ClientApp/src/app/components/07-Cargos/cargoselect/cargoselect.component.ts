import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CargosDatum } from 'src/app/models/cargos/cargos';
import { SelectGlobal } from 'src/app/models/comunes';
import { CargosService } from 'src/app/services/cargos.service';

@Component({
  selector: 'app-cargoselect',
  templateUrl: './cargoselect.component.html',
  styleUrls: ['./cargoselect.component.css']
})
export class CargoselectComponent implements OnInit {

  displayedColumns: string[] = ['position', 'tipo',
  'codcargo', 'cargo', 'seleccionar'];
dataSource: MatTableDataSource<CargosDatum>;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
cargos: CargosDatum[] = [];
Tipo = 'Administrativo';

tiposCargos: SelectGlobal[] = [
  { value: 'Administrativo', viewValue: 'Administrativo' },
  { value: 'Mama', viewValue: 'Mama' },
  { value: 'Pedagogia', viewValue: 'Pedagogia' },
  { value: 'Servicios Generales', viewValue: 'Servicios Generales' },
  { value: 'Tias', viewValue: 'Tias' },
  { value: 'TIC', viewValue: 'TIC' }

]


constructor(
  private service: CargosService,
  private activeModal: NgbActiveModal){

}

cargaInicial(data) {
  this.service.getCargos().subscribe(
    OK => {

      this.cargos = [];
      this.cargos.push(...OK.cargosData)
      this.dataSource = new MatTableDataSource(this.cargos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    },
    Errr => { console.log(Errr) }

  )
}
ngOnInit(): void {

  this.cargaInicial(false);


}
cerrar(){
  
  this.activeModal.dismiss("close");
}

seleccionar(element: CargosDatum){
  this.activeModal.close(element);
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

Cambiar(){

  let cambio = this.cargos.filter(item=> {
    return item.tipo == this.Tipo
  })
  
  
  this.dataSource = new MatTableDataSource(cambio);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort
}

}
