import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ceco, Programa } from '../../../models/programas/programas.response';
import { ProgramasService } from '../../../services/programas.service';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { ActualizarcargoComponent } from '../actualizarcargo/actualizarcargo.component';
import { AgregarcargoComponent } from '../agregarcargo/agregarcargo.component';
import { CargosService } from '../../../services/cargos.service';
import { CargosDatum } from '../../../models/cargos/cargos';
import { SelectGlobal } from '../../../models/comunes';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listacargos',
  templateUrl: './listacargos.component.html',
  styleUrls: ['./listacargos.component.css']
})
export class ListacargosComponent implements OnInit {


  displayedColumns: string[] = ['position', 'tipo',
    'codcargo', 'cargo', 'Actualizar'];
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
    private modalService: NgbModal) {

  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

  openActualizar(element) {
    const modalRef = this.modalService.open(ActualizarcargoComponent, { size: 'md' });
    modalRef.componentInstance.update = element;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.service.Exitoso()
        this.cargaInicial(true)
      }

      if (result === "NOK") {
      
        this.service.NoExitoso("Ha ocurrido un error inespareado", "Intentelo mas tarde")
       
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  openAgregar() {

    const modalRef = this.modalService.open(AgregarcargoComponent, { size: 'md' });


    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial(true)
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  cargaInicial(data) {
    this.service.getCargos().subscribe(
      OK => {

        this.cargos = [];
        if (OK.cargosData != null)
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Cambiar() {

    let cambio = this.cargos.filter(item => {
      return item.tipo == this.Tipo
    })


    this.dataSource = new MatTableDataSource(cambio);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

}
