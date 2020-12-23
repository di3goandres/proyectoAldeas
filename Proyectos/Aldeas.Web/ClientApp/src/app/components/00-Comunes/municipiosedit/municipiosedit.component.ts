import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsMunicipio } from '../../../models/proyectos/proyecto.unico.response';
import { OnlymunicipioeditComponent } from '../onlymunicipioedit/onlymunicipioedit.component';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';

@Component({
  selector: 'app-municipiosedit',
  templateUrl: './municipiosedit.component.html',
  styleUrls: ['./municipiosedit.component.css']
})
export class MunicipioseditComponent implements OnInit {
  displayedColumns: string[] = ['position',  'Departamento', 'Municipio'];
  @Input() dataSource:  ItemsMunicipio[]=[];
  @Output() valid = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
    public service: ProyectoService
  ) { }

  ngOnInit(): void {
    let value = this.service.permitirEditar();

    if (value){
      this.displayedColumns.push( 'Actualizar')
    }
  }

  AbrirEditar(element: ItemsMunicipio ) {
    const modalRef = this.modalService.open(OnlymunicipioeditComponent, { size: 'md' });
    modalRef.componentInstance.itemsMunicipio = element;
    
    modalRef.result.then((result) => {
    
      if(result=="OK"){
        this.dataSource = []
        this.valid.emit(true);
      }
      if(result=="NOK"){
        this.valid.emit(false);
      }
    }, (reason) => {

      this.valid.emit(false);
    });
  }

}
