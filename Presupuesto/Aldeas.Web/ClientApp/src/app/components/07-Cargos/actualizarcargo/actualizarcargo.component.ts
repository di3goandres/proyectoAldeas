import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CargosDatum } from 'src/app/models/cargos/cargos';
import { SelectGlobal } from '../../../models/comunes';
import { CargosService } from '../../../services/cargos.service';

@Component({
  selector: 'app-actualizarcargo',
  templateUrl: './actualizarcargo.component.html',
  styleUrls: ['./actualizarcargo.component.css']
})
export class ActualizarcargoComponent implements OnInit {

  @Input() update : CargosDatum;
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
    this.service.updateCargos(this.cargo)
      .subscribe(

        OK => {
          if (OK.code == 200 && OK.status == "OK") {
            this.activeModal.close('OK')
          }
          console.log(OK)
        },
        ERROR => { console.log(ERROR)
        
        
          this.activeModal.close('NOK')}
      );

  }
  ngOnInit(): void {
   
    this.cargo.id = this.update.id;
    this.cargo.tipo = this.update.tipo;
    this.cargo.cargo = this.update.cargo;
    this.cargo.cod_cargo = this.update.cod_cargo;

    this.formGroupCargo = this._formBuilder.group({

      nombre: ['', Validators.required],
      codigo: ['', [Validators.max(10000), Validators.min(1)]],
      tipo: ['', Validators.required],

    })
  }

}
