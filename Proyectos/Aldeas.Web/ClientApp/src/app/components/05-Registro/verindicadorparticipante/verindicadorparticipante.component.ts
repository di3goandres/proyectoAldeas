import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ItemsProyecto } from '../../../models/ProyectoResponse';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { Indicadores } from '../../../models/indicadores/indicadores.response';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndicadoresParticipante } from '../../../models/indicadores/Respuesta.indicadores.response';
import { Indicador, RespuestasIndicadoresParticipante } from '../../../models/indicadores/Respuestas.response';

@Component({
  selector: 'app-verindicadorparticipante',
  templateUrl: './verindicadorparticipante.component.html',
  styleUrls: ['./verindicadorparticipante.component.css']
})
export class VerindicadorparticipanteComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  proyectos: ItemsProyecto[] = [];
  participantes: RegistroParticipantes[] = []
  atencion: IndicadoresParticipante[] = [];
  firstFormGroup: FormGroup;
  respuestas: RespuestasIndicadoresParticipante[] = [];
  respuestasSeleccionadas: RespuestasIndicadoresParticipante[] = [];

  indicadores: Indicador[];
  idIndicador = 0;
  idParticipante = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public indicadorService: IndicadoresService,

  ) {

    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      participante: ['', Validators.required],
      atencion: ['', Validators.nullValidator],
      indicador: ['', Validators.required],

    });
  }
  traerProyectos() {

    this.atencion = [];

    this.respuestas = [];
    this.indicadores = [];
    this.idIndicador = 0;
    this.idParticipante = 0;
    this.indicadorService.getProyectos().subscribe(
      response => {
        this.proyectos.push(...response.itemsProyectos)
      },
      error => {
        console.log(error);
      }
    );
  }
  TraerRespuestas(id) {

    this.idParticipante;


    this.indicadorService.ObtenerRespuestasIndicadores(this.idParticipante, id).subscribe(
      OK => {

        console.log(OK)
        this.respuestas = [];
        this.indicadores = []
        if (OK.respuestasIndicadoresParticipante.length == 0) {
          this.openSnackBar("No se han registrados respuetas para este participante", "")
        }
        else {
          this.respuestas.push(...OK.respuestasIndicadoresParticipante);
          this.indicadores.push(...OK.indicador)
        }
      },
      ERROR => { console.log(ERROR) },
    )


  }

  traerIndicador(id) {
    this.idParticipante = id;
    this.indicadorService.ObtenerIndicadoresParticipante(id).subscribe(
      OK => {
        console.log(OK)
        this.indicadores = [];
        if (OK.indicadoresParticipante.length == 0) {
          this.openSnackBar("No se han registrados Indicadores para este participante", "")

        }
        else {
          this.atencion.push(...OK.indicadoresParticipante)

        }

      },
      ERROR => { console.log(ERROR) },
    )
  }
  rcols = 0;
  MostrarRespuestas(id) {

    console.log(id)
    if (id == '') {
      id = 0
    }

    this.idIndicador = id;

    this.respuestasSeleccionadas = this.respuestas.filter(item =>
      {
        return item.idPregunta == id
      })

    console.log(this.respuestasSeleccionadas.length)

    if(this.respuestasSeleccionadas.length>3){
      this.rcols = 4
    }else{
      this.rcols = this.respuestasSeleccionadas.length

    }

  }


  obtenerPartipantes(id) {
    this.atencion = [];

    this.respuestas = [];
    this.indicadores = [];
    this.idIndicador = 0;
   
    this.indicadorService.obtenerParticipantes(id).subscribe(
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

  ngOnInit(): void {
    this.traerProyectos()

  }

}
