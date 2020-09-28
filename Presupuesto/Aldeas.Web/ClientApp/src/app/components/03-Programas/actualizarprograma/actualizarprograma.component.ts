import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from 'src/app/services/programas.service';
import { Programa } from '../../../models/programas/programas.response';

@Component({
  selector: 'app-actualizarprograma',
  templateUrl: './actualizarprograma.component.html',
  styleUrls: ['./actualizarprograma.component.css']
})
export class ActualizarprogramaComponent implements OnInit {

  @Input() programa: Programa;
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;
  perNomina = 0;
  perCapacitacion = 0

  programaActualizar: Programa
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private programasService: ProgramasService
  ) { }
  cerrar() {
    this.activeModal.close('dismmiss')
  }

  onGuardar() {

    this.programaActualizar = this.programa;
    this.programaActualizar.nombre = this.NuevoNombre;
    this.programaActualizar.estado = this.activo === "true" ? true : false;
    this.programaActualizar.perNomina = this.perNomina
    this.programaActualizar.perCapacitacion = this.perCapacitacion
    console.log(this.programaActualizar);
    this.programasService.updateProgramas(this.programaActualizar)
      .subscribe(

        OK => {
          if (OK.code == 200 && OK.status == "OK") {
            this.activeModal.close('OK')
          }
          console.log(OK)
        },
        ERROR => { console.log(ERROR) }
      );

  }
  ngOnInit(): void {
    console.log(this.programa)
    this.activo = this.programa.estado === true ? "true" : "false"
    this.NuevoNombre = this.programa.nombre;
    this.perNomina = this.programa.perNomina
    this.perCapacitacion = this.programa.perCapacitacion

    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
      perNomina: ['', [Validators.max(15), Validators.min(1)]],
      perCapacitacion: ['', [Validators.max(2), Validators.min(1)]],

    })
  }

}
