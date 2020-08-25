import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listcheck',
  templateUrl: './listcheck.component.html',
  styleUrls: ['./listcheck.component.css']
})
export class ListcheckComponent implements OnInit {
  @Input() Nombre: string;
  @Input() task: Task;
  @Output() datoSalid = new EventEmitter<Task>();
  mostrarOtro: boolean = false;
  firstFormGroup: FormGroup;
  otroValor: string;
  taskSeleccionado: Task;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      Multiple: ['', Validators.required],

      Otro: [''],

    });

    this.taskSeleccionado = this.task.subtasks[0];
    this.task.subtasks.forEach(item => {
      item.formValid = false;
      item.valorOtro = ''

    })

  }
  onChange(task: Task) {



    let EsOtro = this.task.subtasks.find(item => {
      return item.esOtro === true;
    });
    this.setStakeValidators()

    if (EsOtro.completed) {
      this.mostrarOtro = true;

      this.taskSeleccionado.formValid = false;
      this.setStakeValidators()

    } else {
      this.taskSeleccionado.formValid = true;
      this.mostrarOtro = false;
      this.setStakeValidators()


    }
    this.taskSeleccionado = task;

    this.datoSalid.emit(this.task);


  }

  allComplete: boolean = false;
  updateAllComplete() {

    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);

    this.datoSalid.emit(this.task);

  }

  someComplete(): boolean {

    if (this.task.subtasks == null) {
      return false;
    }
    this.datoSalid.emit(this.task);

    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.mostrarOtro = !this.mostrarOtro
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
    this.datoSalid.emit(this.task);


  }

  onChangeValorOtro() {
    this.setStakeValidators()

    if (this.otroValor.length === 0) {
      this.actualizarValor(false, this.otroValor)

    } else {
      this.actualizarValor(true, this.otroValor)


    }

    this.datoSalid.emit(this.task);




  }

  actualizarValor(valido, valor) {
    let actualizar = this.task.subtasks.find(item => {
      return item.esOtro === true;
    });
    actualizar.valorOtro = valor;
    actualizar.formValid = valido;


    let index = this.task.subtasks.indexOf(actualizar);
    this.task.subtasks[index] = actualizar;
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

}
