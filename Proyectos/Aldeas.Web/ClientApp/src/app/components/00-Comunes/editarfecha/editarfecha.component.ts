import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsFecha, ItemsFechaRequest } from 'src/app/models/proyectos/proyecto.unico.response';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import * as moment from 'moment';
@Component({
  selector: 'app-editarfecha',
  templateUrl: './editarfecha.component.html',
  styleUrls: ['./editarfecha.component.css']
})
export class EditarfechaComponent implements OnInit {
  @Input() Fecha: ItemsFecha

  
  fechaNueva= new Date();
  constructor(
    private activeModal: NgbActiveModal,
    private service: ProyectoService

  ) { }
 permitirGuardar = false;
  ngOnInit(): void {
  }

  Cerrar() {
    this.activeModal.close("close")
  }

  Cambiofecha(event){
    this.permitirGuardar = true;
  }
  data = new ItemsFechaRequest();
  onGuardar(){
    let nueva = new ItemsFecha()
    nueva.id = this.Fecha.id;
    var fecha = moment(this.fechaNueva);
    let n =fecha.format("YYYY-MM-DDTHH:mm:ss");
    nueva.fecha =fecha.format("YYYY-MM-DDTHH:mm:ss")
    this.data.ItemsFechas = nueva;
    console.log(this.data.ItemsFechas);
    this.service.ActualizarItemfecha(this.data).subscribe(
          OK => {console.log(OK)
          
            this.Fecha.fecha=fecha.format("YYYY-MM-DD");
            this.activeModal.close("OK")
          },
          ERROR => {
            this.activeModal.close("NOK")
            
            console.log(ERROR)},
        )
    console.log(this.fechaNueva)
  }


}
