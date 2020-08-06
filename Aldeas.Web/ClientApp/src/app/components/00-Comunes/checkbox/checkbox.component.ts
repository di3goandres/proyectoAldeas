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

      Otro: [{ value: '', disabled: true }, Validators.required],

    });


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

    if (task.esOtro) {
      this.mostrarOtro = true;
      this.setStakeValidators()

    } else {
      this.mostrarOtro = false;
      this.setStakeValidators()


    }
    this.taskSeleccionado = task;
    this.datoSalid.emit(this.taskSeleccionado);

    this.valid.emit(this.firstFormGroup.invalid)


  }

  onChangeValorOtro() {
    this.taskSeleccionado.valorOtro = this.otroValor;
    this.datoSalid.emit(this.taskSeleccionado);

    this.valid.emit(this.firstFormGroup.invalid)

  }

}
