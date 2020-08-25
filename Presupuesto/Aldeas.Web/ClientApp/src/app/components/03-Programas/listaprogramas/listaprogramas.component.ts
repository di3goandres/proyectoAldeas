import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramasService } from '../../../services/programas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Programa, Ceco } from 'src/app/models/programas/programas.response';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

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

  constructor(private servicePrograma:ProgramasService) { 

  //  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

  //   // Assign the data to the data source for the table to render
  //   this.dataSource = new MatTableDataSource(users);
  }

  onChange(value){
    console.log(value)
   let nuevos  = this.cecos.filter(item => {
     return  item.idPrograma == value;
    })
    console.log(nuevos)
    this.dataSource = new MatTableDataSource(nuevos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  ngOnInit(): void {
    this.servicePrograma.getProgramas().subscribe(
      OK => {
        console.log(OK)
        this.programas = [];
        this.programas.push(... OK.programas)
        this.cecos = [];
        this.cecos.push(... OK.cecos)
        // this.dataSource = new MatTableDataSource(this.cecos);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort
      },
      Errr => {console.log(Errr)}

    )

 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}