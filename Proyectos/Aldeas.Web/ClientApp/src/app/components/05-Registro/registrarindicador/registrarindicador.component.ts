import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ItemsProyecto } from '../../../models/ProyectoResponse';
import { RegparticipantesService } from '../../../services/registroparticipantes/regparticipantes.service';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { Indicadores } from '../../../models/indicadores/indicadores.response';
import { IndicadoresPreguntasResponse, ListaPregunta, Preguntas } from '../../../models/indicadores/preguntasIndicador.response';
import { Task } from '../../../models/checkbox';

@Component({
  selector: 'app-registrarindicador',
  templateUrl: './registrarindicador.component.html',
  styleUrls: ['./registrarindicador.component.css']
})
export class RegistrarindicadorComponent implements OnInit {
  proyectos: ItemsProyecto[] = [];
  participantes: RegistroParticipantes[] = []
  indicadores: Indicadores[] = [];
  indicadorPreguntas: IndicadoresPreguntasResponse;
  listaPreguntas: ListaPregunta[];
  Respuesta: string;
  RespuestaCheck: Task[] = [
    { pregunta: 'Nacionalidad', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { pregunta: 'Nacionalidad', name: 'No', completed: false, esOtro: false, color: 'primary' },
  
  ]
  encabezado: Preguntas;
  preguntas:  Preguntas[];
  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
    public indicadorService: IndicadoresService,
    public service: RegparticipantesService,
    private _snackBar: MatSnackBar,

  ) {

    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      participante: ['', Validators.required],
      Indicadores: ['', Validators.nullValidator],
      // Nombre: ['', Validators.required],
      // Apellidos: ['', Validators.required],
      // Edad: ['', Validators.required],
      // FechaNacimiento: ['', Validators.required],
      // Departamento: ['', Validators.required],
      // Municipio: ['', Validators.required],
      // Localidad: ['', Validators.required],
      // UltimoCurso: ['', Validators.required],


    });
  }

  ngOnInit(): void {
    this.traerProyectos()
    this.traerIndicador()
  }
  firstFormGroup: FormGroup;

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


  traerIndicador() {
    this.indicadorService.ObtenerIndicadores().subscribe(
      OK => {


        this.indicadores = [];
        this.indicadores.push(...OK.indicadores)
     
      },
      ERROR => { console.log(ERROR) },
    )
  }


  obtenerPreguntasIndicadores(id) {
    this.indicadorService.ObtenerPreguntasIndicadores(id).subscribe(
      OK => { 

        console.log(OK)
        this.indicadorPreguntas = OK

        this.listaPreguntas = [];
        this.listaPreguntas.push(...OK.listaPreguntas)
      },
      ERROR => { console.log(ERROR) },
    )
  }
  obtenerPartipantes(id) {
    this.service.obtenerParticipantes(id).subscribe(
      OK => {
        this.participantes = [];
        if (OK.registros.length == 0) {
          this.openSnackBar("No se han registrados participantes a este proyecto", "")
        } else {
          this.participantes.push(...OK.registros)
        }

      },
      ERROR => { console.log(ERROR) },
    )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  onNotificar(event: any, Tipo: any) {
    console.log(event, ' - ', Tipo)
  }

}
