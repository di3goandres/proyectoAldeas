import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramasService } from 'src/app/services/programas.service';
import { Ceco } from 'src/app/models/programas/programas.response';
import { Programa } from '../../../models/programas/programas.response';

@Component({
  selector: 'app-agregarcecoaprograma',
  templateUrl: './agregarcecoaprograma.component.html',
  styleUrls: ['./agregarcecoaprograma.component.css']
})
export class AgregarcecoaprogramaComponent implements OnInit {



  @Input() Actuales: Ceco[] = [];
  @Input() programaInput: Programa;
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;
  NuevoSubNombre: string;
  NuevoFacilityNombre: string;

  Validaciones = false;

  cecoAgregar: Ceco
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private programasService: ProgramasService
  ) { }
  cerrar() {
    this.activeModal.close('dismmiss')
  }

  onGuardar() {



    //filtro cuando existe los dos subcentro y codigo
    let filtro = this.Actuales.filter(item => {
      return item.codigoCeco == this.cecoAgregar.codigoCeco
        && item.subCentro == this.cecoAgregar.subCentro
    })

    //si el centro de costo ya existe y solo va agregar un subcentro

    //filtro cuando existe solo el centro
    let filtro_2 = this.Actuales.filter(item => {
      return item.codigoCeco == this.cecoAgregar.codigoCeco
    })
    if( filtro_2.length > 0)
    {
      if(filtro.length > 0){
        this.Validaciones = true
      }
      else{
        this.Validaciones = false

      }
    }
 

    //filtro cuando existe solo el centro

 
    console.log( this.Validaciones,this.cecoAgregar);
    if (!this.Validaciones) {
      this.programasService.storeCeco(this.cecoAgregar)
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

  }
  ngOnInit(): void {
    this.cecoAgregar = new Ceco();
    this.cecoAgregar.idPrograma = this.programaInput.id
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
      CodigoCeco: ['', Validators.required],

      SubCentro: ['', Validators.required],
      NombreSubCentro: ['', Validators.required],

      Facility: ['', Validators.required],


    })




  }

}
