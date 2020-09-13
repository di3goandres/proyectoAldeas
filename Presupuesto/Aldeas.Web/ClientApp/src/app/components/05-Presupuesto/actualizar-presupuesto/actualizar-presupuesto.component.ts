import { Component, OnInit, Input } from '@angular/core';
import { ProgramaL, PresupuestoL } from '../../../models/presupuesto/list.presupuesto.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { Task } from '../../../models/checkbox';


@Component({
  selector: 'app-actualizar-presupuesto',
  templateUrl: './actualizar-presupuesto.component.html',
  styleUrls: ['./actualizar-presupuesto.component.css']
})
export class ActualizarPresupuestoComponent implements OnInit {

  @Input() programa: ProgramaL;
  @Input() guardar: PresupuestoL;
  update: PresupuestoL;
  formGroup: FormGroup;

  noMostrar = false;
  seleccionaAnio = false;
  permitirGuardar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: PresupuestoService,

  ) { }

  aniosCheck: Task[] = [ ]

  cerrar() {
    this.activeModal.dismiss();
  }


  validarFomularios() {
    this.permitirGuardar = this.formGroup.valid
  }

  guardarData() {

    this.service.update(this.update).subscribe(
      OK => {         
        this.activeModal.close("OK");
    },
      Error => { console.log(Error) },

    )
    console.log(this.update)
  }
  ngOnInit(): void {
   
    this.update = new PresupuestoL();
    this.update.id = this.guardar.id;
    this.update.idPrograma  = this.guardar.idPrograma;
    this.update.anio  = this.guardar.anio;

    this.update.coberturaAnual = this.guardar.coberturaAnual;
    this.update.coberturaMensual = this.guardar.coberturaMensual;
    this.update.coberturaMensualEsperada = this.guardar.coberturaMensualEsperada;
    this.update.coberturasCasas= this.guardar.coberturasCasas;


   
    this.noMostrar = true;
    this.formGroup = this._formBuilder.group({

      anual: ['', Validators.required],
      mensual: ['', Validators.required],
      esperado: ['', Validators.required],
      casas: ['', Validators.required],







    })

  }


}
