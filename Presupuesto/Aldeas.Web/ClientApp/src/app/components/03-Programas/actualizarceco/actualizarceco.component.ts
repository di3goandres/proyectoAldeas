import { Component, OnInit, Input } from '@angular/core';
import { Programa } from 'src/app/models/programas/programas.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from 'src/app/services/programas.service';
import { Ceco } from '../../../models/programas/programas.response';

@Component({
  selector: 'app-actualizarceco',
  templateUrl: './actualizarceco.component.html',
  styleUrls: ['./actualizarceco.component.css']
})
export class ActualizarcecoComponent implements OnInit {


  @Input() cecoInput: Ceco;
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;
  NuevoSubNombre: string;
  NuevoFacilityNombre: string;



  cecoActualizar: Ceco
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private programasService: ProgramasService
  ) { }
  cerrar() {
    this.activeModal.close('dismmiss')
  }

  onGuardar() {

    this.cecoActualizar = this.cecoInput;
    this.cecoActualizar.nombre = this.NuevoNombre;
    this.cecoActualizar.nombreSubCentro = this.NuevoSubNombre;
    this.cecoActualizar.facilityNav = this.NuevoFacilityNombre;
    this.cecoActualizar.estado = this.activo === "true" ? true : false;

    console.log(this.cecoActualizar);
    this.programasService.updateCecos(this.cecoActualizar)
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
    this.activo = this.cecoInput.estado === true ? "true" : "false"
    this.NuevoNombre = this.cecoInput.nombre;
    this.NuevoSubNombre = this.cecoInput.nombreSubCentro
    this.NuevoFacilityNombre = this.cecoInput.facilityNav
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
      SubCentro: ['', Validators.required],
      Facility: ['', Validators.required],


    })
   
 


  }
}
