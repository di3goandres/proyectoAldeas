import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorService } from '../../../services/colaborador/colaborador.service';
import { ItemsColaboradores } from '../../../models/colaborardor/colaborador.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { ItemsCentroCosto } from '../../../models/colaborardor/colaborador.detalle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnlycecoeditComponent } from '../../00-Comunes/onlycecoedit/onlycecoedit.component';
import { EditarcolaboradorComponent } from '../editarcolaborador/editarcolaborador.component';

@Component({
  selector: 'app-listacolaboradores',
  templateUrl: './listacolaboradores.component.html',
  styleUrls: ['./listacolaboradores.component.css']
})
export class ListacolaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['position', 'nombre', 'fechaNacimiento',
    'cargo', 'tipoContrato', 'fechaInicio', 'fechaFin', 'detalle']
  idProyecto: string;
  itemsColaboradores: ItemsColaboradores[];
  displayedColumnsCecos: string[] = ['position', 'nombre', 'Actualizar']
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  seleccionado: ItemsColaboradores;
  itemsCentroCosto: ItemsCentroCosto[];
  idColaborador= 0;
  dataSource = new MatTableDataSource<ItemsColaboradores>();

  constructor(
    private route: ActivatedRoute,
    private service: ColaboradorService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();

  }
  cargaInicial() {
    this.service.ObtenerColaboradores(this.idProyecto).subscribe(
      OK => {
       
        this.itemsColaboradores = [],
          this.itemsColaboradores.push(...OK.itemsColaboradores)
        this.dataSource = new MatTableDataSource(this.itemsColaboradores);
        this.dataSource.paginator = this.paginator;
      },
      ERROR => {  },
    )
  }

  Ver(informe: ItemsColaboradores) {
    this.idColaborador = informe.id
    this.cargarDetalle();
    this.stepper.next()
  }

  cargarDetalle(){

    this.service.obtenerDetalleColaborador(  this.idColaborador).subscribe(
      OK => {
    
        this.seleccionado = OK.item;
        this.itemsCentroCosto = [];
        this.itemsCentroCosto.push(...OK.itemsCentroCosto)
       
      },
      ERROR => { console.log(ERROR) },
    );

  }


  AbrirEditar(element: ItemsCentroCosto ) {
    const modalRef = this.modalService.open(OnlycecoeditComponent, { size: 'md' });
    modalRef.componentInstance.Cecos = element;
    
    modalRef.result.then((result) => {
    
      if(result=="OK"){
        this.cargarDetalle()
      }
    }, (reason) => {

     
    });
  }

  abrirEditarDetalle(element: ItemsCentroCosto ) {
    const modalRef = this.modalService.open(EditarcolaboradorComponent, { size: 'md' });
    modalRef.componentInstance.colaboradorEntrada = element;
    
    modalRef.result.then((result) => {
    
      if(result=="OK"){
        this.cargarDetalle()
      }
    }, (reason) => {

     
    });
  }
  

}
