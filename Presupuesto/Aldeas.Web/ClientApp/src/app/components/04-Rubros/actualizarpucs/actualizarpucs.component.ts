import { Component, OnInit, Input } from '@angular/core';
import { Puc } from '../../../models/categorias/categoria.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from 'src/app/services/programas.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-actualizarpucs',
  templateUrl: './actualizarpucs.component.html',
  styleUrls: ['./actualizarpucs.component.css']
})
export class ActualizarpucsComponent implements OnInit {

  @Input() pucsInput: Puc;
  formgroup: FormGroup;
  activo: string;
  NotaIngles: string;
  NuevoNombre: string;
  NuevoSubNombre: string;
  NuevoFacilityNombre: string;

  pucActualizar = new Puc();
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: CategoriasService
  ) { }
  cerrar() {
    this.activeModal.close('dismmiss')
  }

  onGuardar() {


    this.pucActualizar.estado = this.activo  =="true"? true: false
    this.pucActualizar.requiereNotaIngles = this.NotaIngles  =="true"? true: false
    this.pucActualizar.estado = this.activo === "true" ? true : false;


    this.service.updatePuc(this.pucActualizar)
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
    this.pucActualizar.id = this.pucsInput.id;
    this.pucActualizar.tipo = this.pucsInput.tipo;
    this.pucActualizar.cuentaSIIGO = this.pucsInput.cuentaSIIGO;
    this.pucActualizar.cuentaNAV = this.pucsInput.cuentaNAV;
    this.pucActualizar.descripcionCuenta = this.pucsInput.descripcionCuenta;

    this.pucActualizar.detalleCuentaNav = this.pucsInput.detalleCuentaNav;
    this.pucActualizar.tipoCuentaNav = this.pucsInput.tipoCuentaNav;
    console.log( this.pucActualizar.tipoCuentaNav)
    this.pucActualizar.fichaBanco = this.pucsInput.fichaBanco;
    this.pucActualizar.casa = this.pucsInput.casa;
    this.pucActualizar.requiereNotaIngles = this.pucsInput.requiereNotaIngles;
    this.pucActualizar.estado = this.pucsInput.estado;
    this.activo = this.pucActualizar.estado ==true? "true": "false"
    this.NotaIngles=  this.pucActualizar.requiereNotaIngles ==true? "true": "false"
    this.formgroup = this._formBuilder.group({
   
      cuentaSIIGO: ['', Validators.required],
      descripcionCuenta: ['', Validators.required],
      cuentaNAV: ['', Validators.required],
      detalleCuentaNav: ['', Validators.required],
      fichaBanco: ['', Validators.nullValidator],
      casa: ['', Validators.required],

  






    })




  }

}
