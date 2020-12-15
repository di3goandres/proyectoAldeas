import { Component, OnInit, Input, Output, AfterViewChecked, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { Task } from 'src/app/models/checkbox';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit, AfterViewChecked {

  @Input() Nombre: string;
  @Input() task: Task;
  taskMostrar: Task;

  @Output() datoSalid = new EventEmitter<Task>();
  mostrarOtro: boolean = false;
  firstFormGroup: FormGroup;
  selectedOptions: string[] = [];
  otroValor: string;
  taskSeleccionado: Task;
  allComplete: boolean = false;

  mostrar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {

    this.cdRef.detectChanges();

  }
  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      // Multiple: ['', Validators.required],

      Otro: [''],

    });

    this.taskMostrar = this.task;
    console.log(this.taskMostrar.subtasks)
    this.taskSeleccionado = this.task.subtasks[0];
    this.task.subtasks.forEach(item => {
      item.formValid = true;
      item.valorOtro = ''

    })

    this.mostrar = true;
    this.datoSalid.emit(this.taskMostrar);

    this.cdRef.detectChanges();

  }
  onChange(options: MatListOption[]) {
    // console.log(options.map(o => o.value));
   
      this.taskMostrar.subtasks.forEach(task => {

        task.completed = false;
      })
   
    options.map(element => {

      this.taskMostrar.subtasks.forEach(task => {
        // console.log('name: ', task.name, ' value: ',element.value )
        if (task.name == element.value) {
          task.completed = true;
          if (task.esOtro == true) {
            task.formValid == false;
          } else {
            task.formValid == true;
          }
        }
      })

    });
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


    this.datoSalid.emit(this.taskMostrar);


  }

  updateAllComplete() {

    // this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);

    // this.datoSalid.emit(this.task);

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

    this.datoSalid.emit(this.taskMostrar);




  }

  actualizarValor(valido, valor) {
    let actualizar = this.taskMostrar.subtasks.find(item => {
      return item.esOtro === true;
    });
    actualizar.valorOtro = valor;
    actualizar.formValid = valido;


    let index = this.taskMostrar.subtasks.indexOf(actualizar);
    this.taskMostrar.subtasks[index] = actualizar;
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
