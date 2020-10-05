import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'src/app/models/comunes';
import { ProgramaL } from 'src/app/models/presupuesto/list.presupuesto.response';
import { PresupuestoAnioDatum } from 'src/app/models/presupuestoanio/anio.response';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { Task } from '../../../../models/checkbox';
import { PresupuestoL } from '../../../../models/presupuesto/list.presupuesto.response';
import { FinanciadorfaltanteComponent } from '../financiadorfaltante/financiadorfaltante.component';
import { FinanciadoresDatum } from '../../../../models/financiadores/financiadores.response';

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
  financiador: FinanciadoresDatum;
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
   
    modalRef.result.then((result: FinanciadoresDatum) => {
     this.financiador = result;
     this.guardar.idFinanciador = this.financiador.id;
     this.validarFomularios();
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
    this.permitirGuardar = this.formGroup.valid  &&    this.financiador != null ;
  }

  guardarData() {
    this.service.guardar(this.guardar).subscribe(
      OK => {

        this.activeModal.close("OK");
      },
      Error => { console.log(Error) },

    )
    console.log(this.guardar)
  }

  cargaInicial() {
    this.service.getFinanciadoresFaltantes(this.presupuesto.id).subscribe(
      OK => { console.log(OK) },
      Error => { console.log(Error) },

    )
  }
  ngOnInit(): void {

  

 console.log(this.presupuesto)
 this.guardar.idPrograma = this.presupuesto.idPrograma;
 this.guardar.idPresupuestoAnio = this.presupuesto.id;
 this.guardar.anio = this.presupuesto.anio;

    this.noMostrar = true;
    this.formGroup = this._formBuilder.group({

      anual: ['', Validators.required],
      mensual: ['', Validators.required],
      esperado: ['', Validators.required],
      casas: ['', Validators.required],







    })

  }

}
