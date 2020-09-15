import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from 'src/app/models/programas/programas.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { UsuarioProgramaRequest, UsuarioProgramaEnvioRequest } from '../../../models/usuarios/usuario.programa.request';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-verprogramasasociados',
  templateUrl: './verprogramasasociados.component.html',
  styleUrls: ['./verprogramasasociados.component.css']
})
export class VerprogramasasociadosComponent implements OnInit {
  item: UsuarioProgramaEnvioRequest = new UsuarioProgramaEnvioRequest();;
  guardar: UsuarioProgramaRequest[] = []
  @Input() idUsuario: number;
  displayedColumns: string[] = [ 'id', 'nombre',
  'fechaCreacion', 'fechaActualizacion', 'quitar'];
 dataSource: MatTableDataSource<Programa>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;
 programas: Programa[] = [];


 constructor(
   private service:UsuarioService,
   private modalService: NgbModal,

   private activeModal: NgbActiveModal) { 

 }

 asociar(element: Programa) {

  let nuevo = new UsuarioProgramaRequest();
  nuevo.Usuario = this.idUsuario
  nuevo.Programa = element.id

  this.guardar = [];
  this.item.AgregarPrograma = []
  this.guardar.push(nuevo);

  this.item.AgregarPrograma.push(...this.guardar);

 
  this.service.quitarPrograma(this.guardar).subscribe(
    OK => {
      this.openExitoso();
      this.cargaInicial();
    },
    Errr => { console.log(Errr) }

  )
}

openExitoso() {
  const modalRef = this.modalService.open(RegistroexitosoComponent,
    { size: 'md' });

  modalRef.result.then((result) => {


  }, (reason) => {


  });
}
 cargaInicial(){
   this.service.getListProgramasUsuarios(this.idUsuario).subscribe(
     OK => {
     
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


 close(){
  this.activeModal.close("OK")
}
}
