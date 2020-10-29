import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrardetallepresupuesto',
  templateUrl: './borrardetallepresupuesto.component.html',
  styleUrls: ['./borrardetallepresupuesto.component.css']
})
export class BorrardetallepresupuestoComponent implements OnInit {

;
  subtitle ="Confirmación Borrado"
  TituloMOstrar ="¿Estas seguro de borrar este detalle de presupuesto?";
  constructor(
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {
 
  }

  cerrar(){
    this.activeModal.dismiss();
  }
  borrar(){
    this.activeModal.close("BORRAR");
  }
}
