import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestoL, ProgramaL } from '../../../models/presupuesto/list.presupuesto.response';
import { PucRequest } from '../../../models/categorias/categoria.request';
import { SelectItem } from '../../../models/comunes';
import { Task } from 'src/app/models/checkbox';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-generar-presupuesto',
  templateUrl: './generar-presupuesto.component.html',
  styleUrls: ['./generar-presupuesto.component.css']
})
export class GenerarPresupuestoComponent implements OnInit {

  @Input() programa: ProgramaL;
  @Input() presupuesto: PresupuestoL[];
  anioList: SelectItem[] = [];
  guardar: PresupuestoL = new PresupuestoL();
  formGroup: FormGroup;
  anios: any[] = [1]
  noMostrar = false;
  seleccionaAnio = false;
  permitirGuardar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: PresupuestoService,

  ) { }

  aniosCheck: Task[] = [


  ]

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
  agregarAnio(newDate) {
    let nuevo = new SelectItem(newDate, newDate);
    let nuevoTask = new Task()
    nuevoTask.completed = false;
    nuevoTask.esOtro = false;
    nuevoTask.color = 'primary'
    nuevoTask.pregunta = 'Año Presupuesto'

    if (this.presupuesto!= null  && this.presupuesto.length > 0) {

      let existe = this.presupuesto.filter(item => {
        return item.anio == newDate
      });
      nuevo.deshabilidato = existe.length === 0 ? false : true;
      if (nuevo.deshabilidato) {
        nuevo.viewValue = newDate + ' - Ya generado'
      }


      if (nuevo.deshabilidato) {
        nuevoTask.name = newDate + ' - Ya generado'
      } else {

        nuevoTask.name = newDate
      }
     
    
    } else{
      nuevo.deshabilidato = false
      nuevoTask.name = newDate
    }
    nuevoTask.disabled = nuevo.deshabilidato;
    
    this.aniosCheck.push(nuevoTask);
    this.anioList.push(nuevo);
  }
  validarFomularios() {
    this.permitirGuardar = this.formGroup.valid && this.seleccionaAnio;
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
  ngOnInit(): void {
    this.guardar.idPrograma = this.programa.id;
    let newDate = (new Date()).getFullYear()

    this.agregarAnio(newDate - 1);
    this.anios.forEach(element => {

      this.agregarAnio(newDate);

      newDate = newDate + 1



    });






    this.noMostrar = true;
    this.formGroup = this._formBuilder.group({

      anual: ['', Validators.required],
      mensual: ['', Validators.required],
      esperado: ['', Validators.required],
      casas: ['', Validators.required],







    })

  }




}
