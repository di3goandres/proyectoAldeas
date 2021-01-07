import { Component, OnInit, ViewChild } from '@angular/core';
import { Programa } from '../../../../models/programas/programas.response';
import { PresupuestoService } from '../../../../services/presupuesto.service';
import { PresupuestoAnioDatum } from '../../../../models/presupuestoanio/anio.response';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeseacontinuarComponent } from 'src/app/components/00-Comunes/deseacontinuar/deseacontinuar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listaversiones',
  templateUrl: './listaversiones.component.html',
  styleUrls: ['./listaversiones.component.css']
})
export class ListaversionesComponent implements OnInit {
  idPrograma = 0;
  programas: Programa[];
  anios: number[];
  valueAnio = 0;
  actual: PresupuestoAnioDatum;
  versiones: PresupuestoAnioDatum[];
  idTomarVersionAnterior = 0;

  dataSource: MatTableDataSource<PresupuestoAnioDatum>;
  @ViewChild('MatPaginator1', { static: true }) paginator: MatPaginator;
  @ViewChild('MatSort1', { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'anio',
    'nombrePrograma', 'tipoPrograma', 'Cobertura',
    'numeroVersion', 'per_nomina', 'per_capacitacion', 'Fecha Creación', 'Fecha Actualizacion'];


  constructor(
    public service: PresupuestoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let admin = this.service.permitirEditar();
    if (admin) {
      this.displayedColumns.push('TomarEsta');
    }
    this.cargaInicial();
  }
  changePrograma(value) {
    this.idPrograma = value;
    this.valueAnio = 0;
    this.anios = [];
    this.cargarAnios();
  }

  cargarAnios() {
    this.valueAnio = 0;
    this.service.getProgramasVersionAnio(this.idPrograma).subscribe(
      OK => {
        this.anios = [];

        this.anios.push(...OK.anios);
        if (this.anios.length == 0) {
          this.service.MostrarSnack("No se han registrado versiones para este programa");

        }
      },
      ERROR => {
        this.service.NoExitosoComun();

      },
    )
  }
  AbrirTomarVersion(element) {
    this.idTomarVersionAnterior = element.id;
    const modalRef = this.modalService.open(DeseacontinuarComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = "Versionamiento";
    modalRef.componentInstance.mensaje = "Esta a punto de volver a una versión anterior, Desea Continuar?"
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.TomarVersion()
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  TomarVersion() {

    this.service.tomarVersionAnterior(this.idTomarVersionAnterior, this.actual.id).subscribe(
      OK => {
        console.log(OK)

        this.service.Exitoso()
        this.cargarVersiones();

      },
      ERROR => {
        console.log(ERROR)

        this.service.NoExitosoComun()
      },
    )

  }
  changeAnio(value) {
    console.log(value);
    this.valueAnio = value;
    this.cargarVersiones();
  }

  cargarVersiones() {
    this.service.getProgramasListVersionAnio(this.idPrograma, this.valueAnio).subscribe(
      OK => {
        console.log(OK)
        this.actual = OK.actual
        this.versiones = [];
        this.versiones.push(...OK.versiones);
        if (this.versiones.length == 0) {
          this.service.MostrarSnack("No se encontraron versiones a la cuál volver.")
        }
        this.dataSource = new MatTableDataSource(this.versiones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      ERROR => { console.log(ERROR) },
    )
  }
  onGuardar() {

  }
  cargaInicial() {
    this.service.getProgramasVersion().subscribe(
      OK => {
        this.programas = [];
        this.programas.push(...OK.programas);

      },
      ERROR => {


        this.service.NoExitosoComun();
      },
    )
  }

}
