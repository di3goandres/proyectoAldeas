import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroParticipante } from '../../../models/DatosPartipante';
import * as moment from 'moment';
import { UserService } from '../../../services/user.service';
import { Departamento, Municipio } from 'src/app/models/ConsultaDepartamentos';
import { Participantes } from 'src/app/models/proyect';
import { MatTable } from '@angular/material/table';
import { ItemsProyecto } from '../../../models/ProyectoResponse';

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
    id:0,
    pregunta: 'Linea del Proyecto',
    name: 'Línea del Proyecto (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
      {id:0, pregunta: 'Linea del Proyecto', name: 'Educación en Emergencias', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Traslado Humanitario', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Acogimiento Transitorio', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'ICT Corner', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Fortalecimiento Familiar', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Fortalecimiento Comunitario', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Espacios Amigables', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Linea del Proyecto', name: 'Otro', esOtro: true, completed: false, color: 'primary' },
    ]
  };


  taskServicio: Task = {
    id:0,
    pregunta: 'Servicio que recibe',
    name: 'Servicio que Recibe (Opción Multiple)',
    completed: false,
    esOtro: false,
    color: 'primary',
    subtasks: [
      {id:0, pregunta: 'Servicio que recibe', name: 'Educación en Emergencias', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Traslado Humanitario', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Acogimiento Transitorio', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'ICT Corner', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Fortalecimiento Familiar', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Fortalecimiento Comunitario', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Espacios Amigables', esOtro: false, completed: false, color: 'primary' },
      {id:0, pregunta: 'Servicio que recibe', name: 'Otro', esOtro: true, completed: false, color: 'primary' },
    ]
  };


  grupo: string;
  grupoEtnico: Task[] = [
    {id:0, pregunta: 'Grupo Etnico', name: 'Afrodescendiente', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Palenque', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Raizal', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Rom', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Indigena', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Ninguno', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupo Etnico', name: 'Otro', completed: false, esOtro: true, color: 'primary' },

  ]

  nacionalidad: string;
  nacionalidadCheck: Task[] = [
    {id:0, pregunta: 'Nacionalidad', name: 'Colombiano/a', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nacionalidad', name: 'Venezolano/a', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nacionalidad', name: 'Colombo-Venezolano', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nacionalidad', name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  genero: string;
  generoCheck: Task[] = [
    {id:0, pregunta: 'Genero', name: 'Femenino', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Genero', name: 'Masculino', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Genero', name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  sexo: string;
  sexoCheck: Task[] = [
    {id:0, pregunta: 'Sexo', name: 'Hombre', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Sexo', name: 'Mujer', completed: false, esOtro: false, color: 'primary' },
  ]
  tipoParticipante: string;
  tipoParticipanteCheck: Task[] = [
    {id:0, pregunta: 'Tipo Participante', name: 'Niño, Niña, Adolescente O Joven', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Tipo Participante', name: 'Adulto', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Tipo Participante', name: 'Cuidador Principal', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Tipo Participante', name: 'Lider Comunitario', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Tipo Participante', name: 'Representante de Institucion Publica', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Tipo Participante', name: 'Otro', completed: false, esOtro: true, color: 'primary' },
  ]
  discapacidad: string;
  discapacidadCheck: Task[] = [
    {id:0, pregunta: 'Discapacidad', name: 'No', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Discapacidad', name: 'Si', completed: false, esOtro: true, color: 'primary' },

  ];
  singo: string;
  SinoAplicaCheck: Task[] = [
    {id:0, pregunta: 'Depende del Donde se llame', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Depende del Donde se llame', name: 'No', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Depende del Donde se llame', name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },

  ];


  SinoCheck: Task[] = [
    {id:0, pregunta: 'Servicio que recibe', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Servicio que recibe', name: 'No', completed: false, esOtro: false, color: 'primary' },

  ];
  residenciaEstatus: string;
  residenciaEstatusCheck: Task[] = [
    {id:0, pregunta: 'Estado Residencia', name: 'Regular', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Estado Residencia', name: 'Irregular', completed: false, esOtro: false, color: 'primary' },
    { id:0,pregunta: 'Estado Residencia', name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Estado Residencia', name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },
  ];

  colegio: string;
  colegioCheck: Task[] = [
    {id:0, pregunta: 'Asiste al Colegio', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Asiste al Colegio', name: 'No', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Asiste al Colegio', name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Asiste al Colegio', name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },
  ];
  nivelEscolaridad: string;
  nivelEscolaridadCheck: Task[] = [
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Preescolar', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Primaria', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Bachiller', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Técnico / Tecnológico', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Profesional', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Postgrado', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Ninguno', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Nivel Escolaridad', name: 'Otra', completed: false, esOtro: true, color: 'primary' },
  ]


  //Pantalla 2
  displayedColumnsParticipante: string[] =
    ['position', '0 - 5 Años', '6 - 12 años',
      '13 - 15 años', '18 - 24 años', '25 - 56 años',
      'Mayores de 60 años', 'Total']

  gruposPoblacionales: string;
  gruposPoblacionalesCheck: Task[] = [
    {id:0, pregunta: 'Grupos Poblacionales', name: 'Pendular', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupos Poblacionales', name: 'Acogida', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupos Poblacionales', name: 'Transitorio', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupos Poblacionales', name: 'Permanencia', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupos Poblacionales', name: 'Retornado', completed: false, esOtro: false, color: 'primary' },
    {id:0, pregunta: 'Grupos Poblacionales', name: 'No aplica', completed: false, esOtro: false, color: 'primary' },

  ]

  participantes: Participantes[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
  ) { }
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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

  MostrarExitoso: boolean = false;
  Guardando: boolean = false;

  reiniciar() {
    this.datosParticipante = new RegistroParticipante();
  }
  onGuardar(event) {

    this.Guardando = true;

    this.datosParticipante.participantes = []
    this.datosParticipante.participantes.push(...this.participantes)
    this.datosParticipante.Linea = []
    this.datosParticipante.Linea.push(...this.taskLineas);
    this.datosParticipante.Linea.push(this.taskPoblacional);
    this.datosParticipante.Linea.push(this.taskEtnico)
    this.datosParticipante.Linea.push(this.taskNacionalidad)
    this.datosParticipante.Linea.push(this.taskGenero)
    this.datosParticipante.Linea.push(this.taskTipoParticipante)
    this.datosParticipante.Linea.push(this.taskDiscapacidad)
    this.datosParticipante.Linea.push(this.taskNivelEscolaridad)

    console.log(this.datosParticipante);
    this.userService.guardarRegistroParticipantes(this.datosParticipante).subscribe(
      response => {

        this.Guardando = false;
        if (response.status == "OK") {
          this.MostrarExitoso = true;
          this.reiniciar();
        }

      },
      error => {
        console.log(error)
        this.Guardando = false;

      }
    )
  }
  retornarValor(task: Task) {

    console.log(task)
    if (task.esOtro) {
      return task.valorOtro
    } else {
      return task.name
    }

  }
  ValidarEtnico: boolean = false;
  ValidarNacionalidad: boolean = false;
  ValidarGrupoPoblacional: boolean = false;

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



    // console.log('A',this.ValidarEtnico);
    // console.log('B',this.ValidarNacionalidad)
    // console.log('C',this.ValidarGenero)
    // console.log('D',this.ValidarSexo)
    // console.log('E',this.ValidarParticipante)
    // console.log('F',this.ValidarEstatus)
    // console.log('G',this.ValidarColegio)
    // console.log('H',this.ValidarDiscapacidad )
    // console.log('I',this.ValidarEscolaridad)
    // console.log('J',this.ValidarLinea)
    // console.log('K', this.ValidarGrupoPoblacional)




    if (this.ValidarEtnico && this.ValidarNacionalidad && this.ValidarGenero
      && this.ValidarSexo && this.ValidarParticipante && this.ValidarEstatus
      && this.ValidarColegio && this.ValidarDiscapacidad && this.ValidarEscolaridad && this.ValidarLinea && this.ValidarGrupoPoblacional) {
      this.ValidaContinuar = false;
    } else {
      this.ValidaContinuar = true;
    }

  
  }

  taskEtnico: Task;
  taskNacionalidad: Task;
  taskGenero: Task;
  taskTipoParticipante: Task;
  taskDiscapacidad: Task;
  taskNivelEscolaridad: Task;
  taskgrupo: Task;

  taskPoblacional: Task;







  onNotificar(event: Task, Tipo: any) {
 
  
    switch (Tipo) {

      case 'GrupoPoblacional':

        this.datosParticipante.GrupoPoblacional = this.retornarValor(event);
        this.ValidarGrupoPoblacional = event.formValid;
        this.taskPoblacional = event;
        break;
      case 'Etnico':
        this.datosParticipante.GrupoEtnico = this.retornarValor(event);
        this.ValidarEtnico = event.formValid;
        this.taskEtnico = event;

        break;
      case 'Nacionalidad':
        this.datosParticipante.Nacionalidad = this.retornarValor(event);
        this.ValidarNacionalidad = event.formValid;
        this.taskNacionalidad = event;
        break;
      case 'Genero':
        this.datosParticipante.Genero = this.retornarValor(event);
        this.ValidarGenero = event.formValid;
        this.taskGenero = event;
        break;
      case 'Sexo':
        this.datosParticipante.Sexo = this.retornarValor(event);
        this.ValidarSexo = event.formValid;
        break;
      case 'TipoParticipante':
        this.datosParticipante.TipoParticipante = this.retornarValor(event);
        this.ValidarParticipante = event.formValid;
        this.taskTipoParticipante = event;
        break;
      case 'Residencia':
        this.datosParticipante.EstatusResidencia = this.retornarValor(event);
        this.ValidarEstatus = event.formValid;

        break;
      case 'Colegio':
        this.datosParticipante.AsisteAlColegio = this.retornarValor(event);
        this.ValidarColegio = event.formValid;

        break;
      case 'Discapacidad':
        this.datosParticipante.Discapacidad = this.retornarValor(event);
        this.ValidarDiscapacidad = event.formValid;
        this.taskDiscapacidad = event;
        break;
      case 'NivelEscolaridad':
        this.datosParticipante.NivelEscolaridad = this.retornarValor(event);
        this.ValidarEscolaridad = event.formValid;
        this.taskNivelEscolaridad = event;
        break;
      case 'Linea':
        this.verificarLinea(event);
        break;
      default:
        break;
    }
    console.log(event)
    this.onContinuar();
  }

  taskLineas: Task[] = [];
  verificarLinea(event: Task) {
    this.taskLineas = []

    let filtro = event.subtasks.filter(item => item.completed === true);
    if (filtro.length === 0) {
      this.ValidarLinea = false
    }
    else {
      let esOtro = filtro.filter(item => item.esOtro == true);
      if (esOtro.length > 0) {
        this.ValidarLinea = esOtro[0].completed && esOtro[0].formValid;


      } else {
        this.ValidarLinea = true;
      }
    }

    this.taskLineas.push(...filtro)
    this.onContinuar();

  }
  @ViewChild('Integrantes') TableIntegrantes: MatTable<any>;

  actualizar() {
    console.log(this.participantes)
    this.participantes.forEach(

      t => {
        if (!t.Mayores_60) {
          t.Mayores_60 = 0
        }
        t.Total = t.Rango_13_17 + t.Rango_18_24 + t.Rango_25_56 + t.Rango_6_12 + t.Mayores_60 + t.Rango_0_5;

      });

    console.log(this.participantes)
    this.TableIntegrantes.renderRows()
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      FechaInicio: ['', Validators.required],
      Fechafin: ['', Validators.nullValidator],
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
