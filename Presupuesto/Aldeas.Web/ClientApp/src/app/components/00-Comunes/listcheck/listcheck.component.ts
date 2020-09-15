import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listcheck',
  templateUrl: './listcheck.component.html',
  styleUrls: ['./listcheck.component.css']
})
export class ListcheckComponent implements OnInit, AfterViewChecked {
  @Input() Nombre: string;
  @Input() task: Task;
  @Output() datoSalid = new EventEmitter<Task>();
  mostrarOtro: boolean = false;
  firstFormGroup: FormGroup;
  otroValor: string;
  allComplete: boolean = false;

  taskSeleccionado: Task;
  lista = [] = [0, 1, 2, 3,4,5,6,7,8]
  constructor(
    private _formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      Multiple: ['', Validators.required],

      Otro: [''],

    });

    this.taskSeleccionado = this.task;
    this.task.subtasks.forEach(item => {
      item.formValid = false;
      item.valorOtro = ''

    })

    this.allComplete = false;
    this.datoSalid.emit(this.task);



  }
  onChange(tasksele: Task) {



    this.taskSeleccionado = tasksele;
    this.datoSalid.emit(this.task);
    this.changeDetectorRef.detectChanges();


  }

  updateAllComplete() {

    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);

    this.datoSalid.emit(this.task);
    this.changeDetectorRef.detectChanges();

  }

  someComplete(): boolean {

    if (this.task.subtasks == null) {
      return false;
    }


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
    this.changeDetectorRef.detectChanges();


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
