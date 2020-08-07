import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroParticipante } from '../../../models/DatosPartipante';
import * as moment from 'moment';
import { UserService } from '../../../services/user.service';
import { Departamento, Municipio } from 'src/app/models/ConsultaDepartamentos';
import { Participantes } from 'src/app/models/proyect';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-registroparticipantes',
  templateUrl: './registroparticipantes.component.html',
  styleUrls: ['./registroparticipantes.component.css']
})
export class RegistroparticipantesComponent implements OnInit {

  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];
  codigoDepartamento: number;
  codigoMunicipio: number;

  task: Task = {
    name: 'Línea del Proyecto (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
      { name: 'Educación en Emergencias', esOtro: false, completed: false, color: 'primary' },
      { name: 'Traslado Humanitario', esOtro: false, completed: false, color: 'primary' },
      { name: 'Acogimiento Transitorio', esOtro: false, completed: false, color: 'primary' },
      { name: 'ICT Corner', esOtro: false, completed: false, color: 'primary' },
      { name: 'Fortalecimiento Familiar', esOtro: false, completed: false, color: 'primary' },
      { name: 'Fortaliecimiento Comunitario', esOtro: false, completed: false, color: 'primary' },
      { name: 'Espacios Amigables', esOtro: false, completed: false, color: 'primary' },
      { name: 'Otro', esOtro: true, completed: false, color: 'primary' },
    ]
  };

  taskServicio: Task = {
    name: 'Servicio que Recibe (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
      { name: 'Educación en Emergencias', esOtro: false, completed: false, color: 'primary' },
      { name: 'Traslado Humanitario', esOtro: false, completed: false, color: 'primary' },
      { name: 'Acogimiento Transitorio', esOtro: false, completed: false, color: 'primary' },
      { name: 'ICT Corner', esOtro: false, completed: false, color: 'primary' },
      { name: 'Fortalecimiento Familiar', esOtro: false, completed: false, color: 'primary' },
      { name: 'Fortaliecimiento Comunitario', esOtro: false, completed: false, color: 'primary' },
      { name: 'Espacios Amigables', esOtro: false, completed: false, color: 'primary' },
      { name: 'Otro', esOtro: true, completed: false, color: 'primary' },
    ]
  };


  grupo: string;
  grupoEtnico: Task[] = [
    { name: 'Afrodescendiente', completed: false, esOtro: false, color: 'primary' },
    { name: 'Palenque', completed: false, esOtro: false, color: 'primary' },
    { name: 'Raizal', completed: false, esOtro: false, color: 'primary' },
    { name: 'Rom', completed: false, esOtro: false, color: 'primary' },
    { name: 'Indigena', completed: false, esOtro: false, color: 'primary' },
    { name: 'Ninguno', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otro', completed: false, esOtro: true, color: 'primary' },

  ]

  nacionalidad: string;
  nacionalidadCheck: Task[] = [
    { name: 'Colomiano/a', completed: false, esOtro: false, color: 'primary' },
    { name: 'Venezolano/a', completed: false, esOtro: false, color: 'primary' },
    { name: 'Colombo-Venezolano', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  genero: string;
  generoCheck: Task[] = [
    { name: 'Femenino', completed: false, esOtro: false, color: 'primary' },
    { name: 'Masculino', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  sexo: string;
  sexoCheck: Task[] = [
    { name: 'Hombre', completed: false, esOtro: false, color: 'primary' },
    { name: 'Mujer', completed: false, esOtro: false, color: 'primary' },
  ]
  tipoParticipante: string;
  tipoParticipanteCheck: Task[] = [
    { name: 'Niño, Niña, Adolescente O Joven', completed: false, esOtro: false, color: 'primary' },
    { name: 'Adulto', completed: false, esOtro: false, color: 'primary' },
    { name: 'Cuidador Principal', completed: false, esOtro: false, color: 'primary' },
    { name: 'Lider Comunitario', completed: false, esOtro: false, color: 'primary' },
    { name: 'Representante de Institucion Publica', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  discapacidad: string;
  discapacidadCheck: Task[] = [
    { name: 'No', completed: false, esOtro: false, color: 'primary' },
    { name: 'Si', completed: false, esOtro: true, color: 'primary' },

  ];
  singo:string;
  SinoAplicaCheck: Task[] = [
    { name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { name: 'No', completed: false, esOtro: false, color: 'primary' },
    { name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },

  ];


  SinoCheck: Task[] = [
    { name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { name: 'No', completed: false, esOtro: false, color: 'primary' },

  ];
  residenciaEstatus: string;
  residenciaEstatusCheck: Task[] = [
    { name: 'Regular', completed: false, esOtro: false, color: 'primary' },
    { name: 'Irregular', completed: false, esOtro: false, color: 'primary' },
    { name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    { name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },
  ];

  colegio: string;
  colegioCheck: Task[] = [
    { name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { name: 'No', completed: false, esOtro: false, color: 'primary' },
    { name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    { name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },
  ];
  nivelEscolaridad: string;
  nivelEscolaridadCheck: Task[] = [
    { name: 'Preescolar', completed: false, esOtro: false, color: 'primary' },
    { name: 'Primaria', completed: false, esOtro: false, color: 'primary' },
    { name: 'Bachiller', completed: false, esOtro: false, color: 'primary' },
    { name: 'Técnico / Tecnológico', completed: false, esOtro: false, color: 'primary' },
    { name: 'Profesional', completed: false, esOtro: false, color: 'primary' },
    { name: 'Postgrado', completed: false, esOtro: false, color: 'primary' },
    { name: 'Ninguno', completed: false, esOtro: false, color: 'primary' },
    { name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otra', completed: false, esOtro: true, color: 'primary' },
  ]


  //Pantalla 2
  displayedColumnsParticipante: string[] =
  ['position', '0 - 5 Años', '6 - 12 años',
    '13 - 15 años', '18 - 24 años', '25 - 56 años',
    'Mayores de 60 años', 'Total']
    participantes: Participantes[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
  ) { }
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  datosParticipante: RegistroParticipante = new RegistroParticipante();
  FechaInicio(event) {
    var firstDate = moment(this.datosParticipante.FechaIngreso);
    var secondDate = moment(this.datosParticipante.FechaSalida);
    if (firstDate.isValid() && secondDate.isValid()) {
      if (firstDate.toDate() > secondDate.toDate()) {
        this.datosParticipante.FechaSalida = firstDate.toDate();
        secondDate = firstDate
      }
    }

  }
  OnValidar(event, algo) {

  }

  cambioDepartamento(id) {
    this.MunicipioSeleccionado = this.Municipios.filter(municipio => {
      return municipio.codigoDepartamento === id;
    });
    this.codigoDepartamento = id;
  }
  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  proyectos: ItemsProyecto[] = [];
  traerProyectos() {
    this.userService.getProyectos().subscribe(
      response => {
        this.proyectos.push(...response.itemsProyectos)
      },
      error => {
        console.log(error);
      }
    );
  }
  traerDepartamentos() {
    this.userService.getDepartamentos().subscribe(
      response => {
        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)
      },
      error => {
        console.log(error);
      }
    );
  }
  onGuardar(event) {
    this.datosParticipante.participantes = []
    this.datosParticipante.participantes.push(...this.participantes)
    console.log(this.datosParticipante);
  }
  retornarValor(task: Task) {

    if (task.esOtro) {
      return task.valorOtro
    } else {
      return task.name
    }

  }
  ValidarEtnico: boolean = false;
  ValidarNacionalidad: boolean = false;
  ValidarGenero: boolean = false;
  ValidarSexo: boolean = false;
  ValidarParticipante: boolean = false;
  ValidarEstatus: boolean = false;
  ValidarColegio: boolean = false;
  ValidarDiscapacidad: boolean = false;
  ValidarEscolaridad: boolean = false;
  ValidarLinea: boolean = false;
  ValidaContinuar: boolean = true;
  onContinuar() {


    if (this.ValidarEtnico && this.ValidarNacionalidad && this.ValidarGenero
      && this.ValidarSexo && this.ValidarParticipante && this.ValidarEstatus
      && this.ValidarColegio && this.ValidarDiscapacidad && this.ValidarEscolaridad && this.ValidarLinea) {
      this.ValidaContinuar = false;
    } else {
      this.ValidaContinuar = true;
    }

    // if((this.firstFormGroup.invalid===false)&&(this.ValidaContinuar===false)){
    // }
    // else{
    //   this.ValidaContinuar = false;

    // }
    
  }


  onNotificar(event: Task, Tipo: any) {
    switch (Tipo) {
      case 'Etnico':
        this.datosParticipante.GrupoEtnico = this.retornarValor(event);
        this.ValidarEtnico = event.formValid;
        this.onContinuar();

        break;
      case 'Nacionalidad':
        this.datosParticipante.Nacionalidad = this.retornarValor(event);
        this.ValidarNacionalidad = event.formValid;
        this.onContinuar();
        break;
      case 'Genero':
        this.datosParticipante.Genero = this.retornarValor(event);
        this.ValidarGenero = event.formValid;
        this.onContinuar();
        break;
      case 'Sexo':
        this.datosParticipante.Sexo = this.retornarValor(event);
        this.ValidarSexo = event.formValid;
        break;
      case 'TipoParticipante':
        this.datosParticipante.TipoParticipante = this.retornarValor(event);
        this.ValidarParticipante = event.formValid;
        this.onContinuar();
        break;
      case 'Residencia':
        this.datosParticipante.EstatusResidencia = this.retornarValor(event);
        this.ValidarEstatus = event.formValid;
        this.onContinuar();
        break;
      case 'Colegio':
        this.datosParticipante.AsisteAlColegio = this.retornarValor(event);
        this.ValidarColegio = event.formValid;
        this.onContinuar();
        break;
      case 'Discapacidad':
        this.datosParticipante.Discapacidad = this.retornarValor(event);
        this.ValidarDiscapacidad = event.formValid;
        this.onContinuar();
        break;
      case 'NivelEscolaridad':
        this.datosParticipante.NivelEscolaridad = this.retornarValor(event);
        this.ValidarEscolaridad = event.formValid;
        this.onContinuar();
        break;
      case 'Linea':
        this.verificarLinea(event);
        this.onContinuar();
        break;
      default:
        break;
    }

  }

  verificarLinea(event: Task) {
    this.datosParticipante.Linea = []

    let filtro = event.subtasks.filter(item => item.completed === true);
    if (filtro.length === 0) {
      this.ValidarLinea = false
    }
    else {
      let esOtro = filtro.filter(item =>
        item.esOtro == true);
      if (esOtro.length > 0) {
        this.ValidarLinea = esOtro[0].completed && esOtro[0].formValid;
      } else {
        this.ValidarLinea = true;
      }
    }
   
    this.datosParticipante.Linea.push(...filtro)
  }
  @ViewChild('Integrantes') TableIntegrantes: MatTable<any>;

  actualizar(){
    console.log(this.participantes)
    this.participantes.forEach(
    
      t =>{
        if(!t.Mayores_60){
            t.Mayores_60 = 0
        }
        t.Total =t.Rango_13_17 +t.Rango_18_24+t.Rango_25_56 + t.Rango_6_12 + t.Mayores_60 + t.Rango_0_5;
      
      });
     
      console.log(this.participantes)
     this.TableIntegrantes.renderRows()
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      FechaInicio: ['', Validators.required],
      Fechafin: ['', Validators.required],
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Edad: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Departamento: ['', Validators.required],
      Municipio: ['', Validators.required],
      Localidad: ['', Validators.required],
      UltimoCurso: ['', Validators.required],


    });

    this.thirdFormGroup = this._formBuilder.group({
  

    });
    this.traerDepartamentos()
    this.traerProyectos()
    this.participantes.push(new Participantes("MUJERES"))
    this.participantes.push(new Participantes("HOMBRES"))

  }

}
