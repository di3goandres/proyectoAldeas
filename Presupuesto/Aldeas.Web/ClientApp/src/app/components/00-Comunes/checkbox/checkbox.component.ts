import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() tasks: Task[] = [];
  @Input() datoEntrada: any;
  @Input() NombreChecbok: string;
  @Output() datoSalid = new EventEmitter<Task>();
  @Output() valid = new EventEmitter<boolean>();

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
      item.formValid = false;
      item.valorOtro = ''

    })

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
    task.completed = true;
    this.taskSeleccionado = task;


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
