import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CentroCostosList } from '../../../models/proyect';
import { CentrosCosto, SubCentro } from '../../../models/comunes';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listcentroscostos',
  templateUrl: './listcentroscostos.component.html',
  styleUrls: ['./listcentroscostos.component.css']
})
export class ListcentroscostosComponent implements OnInit {
  agregar: boolean = false;
  centrosCostos: CentrosCosto[] = [];
  subCentro: SubCentro[] = [];
  subCentroSeleccionado: SubCentro[] = [];
  nombre:string="";
  idSubcentroCosto: number = 0;
  @ViewChild('lista') listaTable: MatTable<any>;
  displayedColumns: string[] = ['position',  'Nombre', 'Quitar'];
  dataSource: CentroCostosList[]=[];
  @Output() Salida = new EventEmitter<CentroCostosList[]>();


  constructor(
    public userService: UserService ) { }


  ngOnInit(): void {
    this.traerCentrosCostos()
  }

  eliminar(element){
    this.dataSource = this.dataSource.filter(item => {
      return item.position !== element.position;
    });

    let conteo = this.dataSource.length
    let conteointerno = 0;
    this.dataSource.forEach(item => {
      conteointerno += 1;
      item.position = conteointerno
    })
    this.listaTable.renderRows();

    if (this.dataSource.length === 0) {
      this.agregar = false;
    } else {
      this.agregar = true
    }
  
    if (3 > conteo) {
      this.agregar = true;

    }
    this.Salida.emit(this.dataSource)

  }

  Agregar(){

    this.agregar = false;
   

    let conteo = this.dataSource.length + 1
    let nuevo = new CentroCostosList(
      this.nombre,
      this.idSubcentroCosto,
      conteo
    );
    this.dataSource.push(nuevo);
    this.listaTable.renderRows();
    
    if (conteo === 3) {
      this.agregar = false;
    }
    this.Salida.emit(this.dataSource)

  }

  cambio(id){
    let conteo = this.dataSource.length
    if (conteo === 3) {
      this.agregar = false;
    }else
    {
      this.agregar = true;

    }
  
    this.idSubcentroCosto = id;
    this.nombre = this.subCentroSeleccionado.find(item=> item.codigoSubCentro === id).nombre


  }
  cambioCentroCosto(id) {


    this.subCentroSeleccionado = this.subCentro.filter(item => {
      return item.codigoCentro === id;
    });
  

  }
  traerCentrosCostos() {
    this.userService.getCentrosResponse().subscribe(
      response => {

        this.centrosCostos.push(...response.centrosCostos)
        this.subCentro.push(...response.subCentro)

      },
      error => {
        console.log(error);
      }
    );
  }
}
