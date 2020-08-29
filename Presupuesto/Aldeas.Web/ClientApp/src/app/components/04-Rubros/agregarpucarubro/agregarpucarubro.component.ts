import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Puc } from 'src/app/models/categorias/categoria.response';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categorias/categoria.response';

@Component({
  selector: 'app-agregarpucarubro',
  templateUrl: './agregarpucarubro.component.html',
  styleUrls: ['./agregarpucarubro.component.css']
})
export class AgregarpucarubroComponent implements OnInit {
 
  @Input() categoria: Categoria;
  formgroup: FormGroup;
  activo: string;
  NotaIngles = "false"
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


 
    this.pucActualizar.requiereNotaIngles = this.NotaIngles  =="true"? true: false

    console.log( this.pucActualizar)

    this.service.storePuc(this.pucActualizar)
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

    this.pucActualizar.idCategoria = this.categoria.id;
  
    this.formgroup = this._formBuilder.group({
   
      cuentaSIIGO: ['', Validators.required],
      descripcionCuenta: ['', Validators.required],
      cuentaNAV: ['', Validators.required],
      detalleCuentaNav: ['', Validators.required],
      fichaBanco: ['', Validators.nullValidator],
      casa: ['', Validators.nullValidator],

  






    })




  }

}
