import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroParticipante } from '../../../models/DatosPartipante';
import * as moment from 'moment';
import { UserService } from '../../../services/user.service';
import { Departamento, Municipio } from 'src/app/models/ConsultaDepartamentos';

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

  lineaProyecto: string;
  lineaProyectoCheck: string[] = ['Educación en Emergencias',
    'Traslado Humanitario',
    'Acogimiento Transitorio',
    'ICT Corner',
    'Fortalecimiento Familiar',
    'Espacios Amigables', 'Fortaliecimiento Comunitario',
    'Otra'
  ];
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




  residenciaEstatus: string;
  residenciaEstatusCheck: Task[] = [
    { name: 'Regular', completed: false, esOtro: false, color: 'primary' },
    { name: 'Irregular', completed: false, esOtro: false, color: 'primary' },
    { name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    { name: 'No Aplica', completed: false, esOtro: false, color: 'primary' },

    // 'Regular', 'Irregular', 'NS/NR', 'No Aplica'

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
    { name: 'Técnico/Tecnológico', completed: false, esOtro: false, color: 'primary' },
    { name: 'Profesional', completed: false, esOtro: false, color: 'primary' },
    { name: 'Postgrado', completed: false, esOtro: false, color: 'primary' },
    { name: 'Ninguno', completed: false, esOtro: false, color: 'primary' },
    { name: 'NS/NR', completed: false, esOtro: false, color: 'primary' },
    { name: 'Otra', completed: false, esOtro: true, color: 'primary' },
  ]






  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
  ) { }
  firstFormGroup: FormGroup;
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
  OnValidar(event, algo){
    console.log(algo, event);
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

  traerDepartamentos() {
    this.userService.getDepartamentos().subscribe(
      response => {

        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)

        // this.cambioDepartamento(this.Departamentos[0].codigo);


      },
      error => {
        console.log(error);
      }
    );
  }

  onGuardar(event) {
    console.log(this.datosParticipante);
  }

  retornarValor(task: Task) {

    if (task.esOtro) {
      return task.valorOtro
    } else {
      return task.name
    }

  }
  onNotificar(event: Task, Tipo: any) {
    switch (Tipo) {
      case 'Etnico':
        this.datosParticipante.GrupoEtnico = this.retornarValor(event);
        break;
      case 'Nacionalidad':
        this.datosParticipante.Nacionalidad = this.retornarValor(event);
        break;
      case 'Genero':
        this.datosParticipante.Genero = this.retornarValor(event);
        break;
      case 'Sexo':
        this.datosParticipante.Sexo = this.retornarValor(event);
        break;
      case 'TipoParticipante':
        this.datosParticipante.TipoParticipante = this.retornarValor(event);
        break;
      case 'Residencia':
        this.datosParticipante.TipoParticipante = this.retornarValor(event);
        break;
      case 'Colegio':
        this.datosParticipante.AsisteAlColegio = this.retornarValor(event);
        break;
      case 'Discapacidad':
        this.datosParticipante.Discapacidad = this.retornarValor(event);
        break;
      case 'NivelEscolaridad':
        this.datosParticipante.NivelEscolaridad = this.retornarValor(event);
        break;


      default:
        break;
    }

  }
  ngOnInit(): void {




    this.firstFormGroup = this._formBuilder.group({

      FechaInicio: ['', Validators.required],

      Fechafin: ['', Validators.required],
      Nombre: ['', Validators.required],

      Apellidos: ['', Validators.required],
      Edad: ['', Validators.required],


      FechaNacimiento: ['', Validators.required],
      Departamento: ['', Validators.required],
      Municipio: ['', Validators.required],
      Localidad: ['', Validators.required],


      // Otro: ['', Validators.required],
      // Genero: ['', Validators.required],

      // Grupo: ['', Validators.required],
      // Nacionalidad: ['', Validators.required],
      // Colegio: ['', Validators.required],
      // Residencia: ['', Validators.required],
      Multiple: ['', Validators.required],
      OtroMultiple: ['', Validators.required],




    });

    this.traerDepartamentos()


  }

}
