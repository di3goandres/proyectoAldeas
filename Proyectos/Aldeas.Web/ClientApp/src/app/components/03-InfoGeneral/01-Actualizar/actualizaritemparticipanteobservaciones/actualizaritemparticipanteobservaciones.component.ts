import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemProyectados } from 'src/app/models/proyectos/proyecto.unico.response';
import { ProyectoService } from 'src/app/services/proyectos/proyecto.service';
import { ItemProyectadosRequest } from '../../../../models/proyectos/proyecto.unico.response';

@Component({
  selector: 'app-actualizaritemparticipanteobservaciones',
  templateUrl: './actualizaritemparticipanteobservaciones.component.html',
  styleUrls: ['./actualizaritemparticipanteobservaciones.component.css']
})
export class ActualizaritemparticipanteobservacionesComponent implements OnInit {

  @Input() itemProyectados: ItemProyectados;
  itemProyectadosUpdate = new ItemProyectados();
  NoGuardar = false;
  firstFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: ProyectoService,

  ) { }

  Close() {
    this.activeModal.close("MOK")
  }
  ngOnInit(): void {
    this.itemProyectadosUpdate.id = this.itemProyectados.id;
    this.itemProyectadosUpdate.totalFamilias = this.itemProyectados.totalFamilias;
    this.itemProyectadosUpdate.observaciones = this.itemProyectados.observaciones;

    this.firstFormGroup = this._formBuilder.group({
      total: ['', [Validators.min(0),  Validators.required]],
      observaciones: ['', Validators.required],

    });

  }

  Cambio(event) {
    this.NoGuardar = true;
  }
  data= new ItemProyectadosRequest();
  onGuardar() {
    this.data.ItemProyectados = this.itemProyectadosUpdate;
    this.service.ActualizarobserParticipantes(this.data).subscribe(
          OK => {console.log(OK)
             this.activeModal.close("OK");
          
          },
          ERROR => {
            this.activeModal.close("NOK");
            
            console.log(ERROR)},
        )
  }

  

}
