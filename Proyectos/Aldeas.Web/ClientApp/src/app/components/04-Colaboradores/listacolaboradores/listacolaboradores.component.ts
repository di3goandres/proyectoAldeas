import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorService } from '../../../services/colaborador/colaborador.service';
import { ItemsColaboradores } from '../../../models/colaborardor/colaborador.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { ItemsCentroCosto } from '../../../models/colaborardor/colaborador.detalle';

@Component({
  selector: 'app-listacolaboradores',
  templateUrl: './listacolaboradores.component.html',
  styleUrls: ['./listacolaboradores.component.css']
})
export class ListacolaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['position', 'nombre',  'fechaNacimiento',
  'cargo', 'tipoContrato', 'fechaInicio', 'fechaFin', 'detalle' ]
  idProyecto: string;
  itemsColaboradores: ItemsColaboradores[];
  displayedColumnsCecos: string[] = ['position', 'nombre' ]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
   seleccionado: ItemsColaboradores;
   itemsCentroCosto: ItemsCentroCosto[];

  dataSource = new MatTableDataSource<ItemsColaboradores>();

  constructor(
    private route: ActivatedRoute,
    private service: ColaboradorService

  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();

  }
  cargaInicial() {
    this.service.ObtenerColaboradores(this.idProyecto).subscribe(
      OK => {
        console.log(OK)
        this.itemsColaboradores = [],
          this.itemsColaboradores.push(...OK.itemsColaboradores)
        this.dataSource = new MatTableDataSource(this.itemsColaboradores);
        this.dataSource.paginator = this.paginator;
      },
      ERROR => { console.log(ERROR) },
    )
  }

    Ver(informe: ItemsColaboradores) {

      console.log(informe);
    this.service.obtenerDetalleColaborador(informe.id).subscribe(
          OK => {
            console.log(OK);
            this.seleccionado = OK.item;
            this.itemsCentroCosto = [];
            this.itemsCentroCosto.push(...OK.itemsCentroCosto)
            this.stepper.next()
          },
          ERROR => {console.log(ERROR)},
        );
  }

}
