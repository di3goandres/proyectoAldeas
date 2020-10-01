import { Component, OnInit } from '@angular/core';
import { SelectGlobal } from '../../../models/comunes';
import { CargosDatum } from '../../../models/cargos/cargos';
import { CargosService } from '../../../services/cargos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregarcargo',
  templateUrl: './agregarcargo.component.html',
  styleUrls: ['./agregarcargo.component.css']
})
export class AgregarcargoComponent implements OnInit {
  Tipos = '';
  cargo =new  CargosDatum();
  tiposCargos: SelectGlobal[] = [
    { value: 'Administrativo', viewValue: 'Administrativo' },
    { value: 'Mama', viewValue: 'Mama' },
    { value: 'Pedagogia', viewValue: 'Pedagogia' },
    { value: 'Servicios Generales', viewValue: 'Servicios Generales' },
    { value: 'Tias', viewValue: 'Tias' },
    { value: 'TIC', viewValue: 'TIC' }
  ]
  formGroupCargo: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: CargosService,

  ) { }
  cerrar() {
    this.activeModal.close('dismmiss')
  }

  onGuardar() {
    this.cargo.cod_cargo = this.cargo.cod_cargo.toString()

    console.log(this.cargo);
    this.service.guardarCargos(this.cargo)
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
   
    this.formGroupCargo = this._formBuilder.group({

      nombre: ['', Validators.required],
      codigo: ['', [Validators.max(10000), Validators.min(1)]],
      tipo: ['', Validators.required],

    })
  }

}
