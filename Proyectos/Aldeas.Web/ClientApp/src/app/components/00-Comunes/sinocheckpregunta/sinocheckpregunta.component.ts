import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/checkbox';

@Component({
  selector: 'app-sinocheckpregunta',
  templateUrl: './sinocheckpregunta.component.html',
  styleUrls: ['./sinocheckpregunta.component.css']
})
export class SinocheckpreguntaComponent implements OnInit {

 
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

  tasks: Task[] = [
    { pregunta: 'Respuesta', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { pregunta: 'Respuesta', name: 'No', completed: false, esOtro: false, color: 'primary' },
  
  ]
  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      Estado: ['', Validators.required],


    });

    this.taskSeleccionado = this.tasks[0];

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
  
  onLoad() {
    this.valid.emit(this.firstFormGroup.invalid)
  }
  onChange(task: Task) {

   

    if (task.esOtro) {
      this.mostrarOtro = true;
      this.taskSeleccionado.formValid = false;
 

    } else {
      this.taskSeleccionado.formValid = true;
      this.mostrarOtro = false;
    


    }
    this.taskSeleccionado = task;

    this.datoSalid.emit(this.taskSeleccionado);

    this.valid.emit(this.firstFormGroup.invalid)


  }



}
