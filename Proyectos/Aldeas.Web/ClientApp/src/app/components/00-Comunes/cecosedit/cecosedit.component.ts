import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsCentroCosto } from '../../../models/proyectos/proyecto.unico.response';
import { OnlycecoeditComponent } from '../onlycecoedit/onlycecoedit.component';

@Component({
  selector: 'app-cecosedit',
  templateUrl: './cecosedit.component.html',
  styleUrls: ['./cecosedit.component.css']
})
export class CecoseditComponent implements OnInit {
  displayedColumns: string[] = ['position',  'Nombre', 'Actualizar'];
  @Input() dataSource: ItemsCentroCosto[]=[];
  @Output() valid = new EventEmitter<boolean>();


  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  
  }

  registroExitoso() {
    const modalRef = this.modalService.open(OnlycecoeditComponent, { size: 'md' });

    modalRef.result.then((result) => {
     
     
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  AbrirEditar(element: ItemsCentroCosto ) {
    const modalRef = this.modalService.open(OnlycecoeditComponent, { size: 'md' });
    modalRef.componentInstance.Cecos = element;
    
    modalRef.result.then((result) => {
    
      if(result=="OK"){
        this.valid.emit(true);
      }
    }, (reason) => {

      this.valid.emit(false);
    });
  }
}
