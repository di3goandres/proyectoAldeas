import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/checkbox';

@Component({
  selector: 'app-checkbox-v2',
  templateUrl: './checkbox-v2.component.html',
  styleUrls: ['./checkbox-v2.component.css']
})
export class CheckboxV2Component implements OnInit {

  @Input() tasks: Task[] = [];
  @Input() datoEntrada: any;
  @Input() NombreChecbok: string;
  @Output() datoSalid = new EventEmitter<Task>();
  @Output() valid = new EventEmitter<boolean>();

  termineCargar=false;
  taskSeleccionado: Task;
  mostrarOtro: boolean = false;
  firstFormGroup: FormGroup;
  otroValor: string;
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      Estado: ['', Validators.required],

      Otro: [''],

    });

    this.taskSeleccionado = this.tasks[0];
    this.setStakeValidators()
    this.tasks.forEach(item => {
      item.formValid = this.datoEntrada == ''? false:true;
      // item.valorOtro = ''

    })
    this.tasks.forEach(item=> {
      if(item.esOtro && item.completed){
        this.mostrarOtro = true;
        this.otroValor = item.valorOtro;
      }
    })

    console.log( this.tasks)
    this.termineCargar=true;
    this.datoSalid.emit(this.taskSeleccionado);

  }

  ValidarEstado() {
    let retorno: boolean = false;
    switch (this.firstFormGroup.status) {
      case 'VALID':
        retorno = true;
        break;

      default:
        retorno = false;
        break;
    }
    return retorno
  }
  setStakeValidators(): void {
    const stakeControl = this.firstFormGroup.get('Otro');
    if (this.mostrarOtro === true) {
      stakeControl.enable();
    } else {
      stakeControl.disable();
    }
    stakeControl.updateValueAndValidity();


  }
  onLoad() {
    this.valid.emit(this.firstFormGroup.invalid)
  }
  onChange(task: Task) {

     this.taskSeleccionado = task;

    this.setStakeValidators()

    if (task.esOtro) {
      this.mostrarOtro = true;
      this.taskSeleccionado.formValid = false;
      this.setStakeValidators()

    } else {
      this.taskSeleccionado.formValid = true;
      this.mostrarOtro = false;
      this.setStakeValidators()


    }

    this.datoSalid.emit(this.taskSeleccionado);

    this.valid.emit(this.firstFormGroup.invalid)


  }

  onChangeValorOtro() {
 

    this.setStakeValidators()
   
    if (this.otroValor.length === 0) {
      this.taskSeleccionado.formValid = false;

    } else {
      this.taskSeleccionado.formValid = true;

    }
    this.taskSeleccionado.valorOtro = this.otroValor;
  
    this.datoSalid.emit(this.taskSeleccionado);

    this.valid.emit(this.firstFormGroup.invalid)



  }

}
