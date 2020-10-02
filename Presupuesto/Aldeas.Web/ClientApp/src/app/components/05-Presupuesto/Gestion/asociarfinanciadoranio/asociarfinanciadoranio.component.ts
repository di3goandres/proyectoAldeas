import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'src/app/models/comunes';
import { ProgramaL } from 'src/app/models/presupuesto/list.presupuesto.response';
import { PresupuestoAnioDatum } from 'src/app/models/presupuestoanio/anio.response';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { Task } from '../../../../models/checkbox';
import { PresupuestoL } from '../../../../models/presupuesto/list.presupuesto.response';
import { FinanciadoresCecoFaltante } from '../../../../models/financiadores/financiadorFaltante.response';
import { FinanciadorfaltanteComponent } from '../financiadorfaltante/financiadorfaltante.component';

@Component({
  selector: 'app-asociarfinanciadoranio',
  templateUrl: './asociarfinanciadoranio.component.html',
  styleUrls: ['./asociarfinanciadoranio.component.css']
})
export class AsociarfinanciadoranioComponent implements OnInit {

  @Input() presupuesto : PresupuestoAnioDatum;

  anioList: SelectItem[] = [];
  guardar=new PresupuestoL();
  formGroup: FormGroup;
  anios: any[] = [1]
  noMostrar = false;
  seleccionaAnio = false;
  permitirGuardar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: PresupuestoService,
    private modalService: NgbModal

  ) { }

 
  openUsuarios() {
    const modalRef = this.modalService.open(FinanciadorfaltanteComponent, { size: 'lg' });
    modalRef.componentInstance.idPresupuestoAnio = this.presupuesto.id;
   
    modalRef.result.then((result) => {
     console.log(result);
 
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  cerrar() {
    this.activeModal.dismiss();
  }
  onNotificar(event: Task, Tipo: any) {


    if (event.completed) {
      this.guardar.anio = Number(event.name);
    }
    this.seleccionaAnio = true;
    this.validarFomularios();

  }
  
  validarFomularios() {
    this.permitirGuardar = this.seleccionaAnio;
  }

  guardarData() {
    // this.service.guardarPresupuestoAnio(this.guardar).subscribe(
    //   OK => {

    //     this.activeModal.close("OK");
    //   },
    //   Error => { console.log(Error) },

    // )
    // console.log(this.guardar)
  }

  cargaInicial() {
    this.service.getFinanciadoresFaltantes(this.presupuesto.id).subscribe(
      OK => { console.log(OK) },
      Error => { console.log(Error) },

    )
  }
  ngOnInit(): void {

  

 
    this.noMostrar = true;
    this.formGroup = this._formBuilder.group({

      anual: ['', Validators.required],
      mensual: ['', Validators.required],
      esperado: ['', Validators.required],
      casas: ['', Validators.required],







    })

  }

}
