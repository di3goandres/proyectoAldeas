import { Component, OnInit, ViewChild } from '@angular/core';
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
import { IndicadoresRequest, RespuestaIndicadores } from '../../../models/indicadores/Respuesta.Indicadores';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-registrarindicador',
  templateUrl: './registrarindicador.component.html',
  styleUrls: ['./registrarindicador.component.css']
})
export class RegistrarindicadorComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  proyectos: ItemsProyecto[] = [];
  participantes: RegistroParticipantes[] = []

  Respuestas: RespuestaIndicadores[] = [];
  indicadores: Indicadores[] = [];
  indicadorPreguntas: IndicadoresPreguntasResponse;
  listaPreguntas: ListaPregunta[];
  listaPreguntasSeleccionadas: ListaPregunta[] = [];
  indicadoresConsultar: any = "";
  PermitirGuardar = false;

  indicadoresRequest = new IndicadoresRequest();
  Respuesta: string;
  RespuestaCheck: Task[] = [
    { pregunta: 'Nacionalidad', name: 'Si', completed: false, esOtro: false, color: 'primary' },
    { pregunta: 'Nacionalidad', name: 'No', completed: false, esOtro: false, color: 'primary' },

  ]
  encabezado: Preguntas;
  preguntas: Preguntas[];


  respuestaIndicadores: RespuestaIndicadores[] = []
  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
    public indicadorService: IndicadoresService,
    public service: RegparticipantesService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,


  ) {

    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      participante: ['', Validators.required],
      Indicadores: ['', Validators.nullValidator]


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
    this.indicadoresConsultar = [];
    this.indicadoresConsultar = id;



  }


  crearRespuestas() {
    this.respuestaIndicadores = []
    this.listaPreguntas.forEach(element => {

      element.listaPreguntas.forEach(preguntas => {

        preguntas.preguntas.forEach(pregunta => {
          let nueva = new RespuestaIndicadores();


          nueva.idIndicadorPregunta = pregunta.id
          nueva.Tipo = pregunta.tipo;

          this.respuestaIndicadores.push(nueva);

        })


      });

    });

    console.log(this.respuestaIndicadores);
  }
  consultarIndicadoresPreguntas() {
    this.indicadorService.ObtenerPreguntasIndicadores(this.indicadoresConsultar).subscribe(
      OK => {
        this.indicadorPreguntas = OK
        this.listaPreguntas = [];
        this.listaPreguntas.push(...OK.listaPreguntas)
        this.crearRespuestas();

      },
      ERROR => { console.log(ERROR) },
    )
  }
  agregarQuitar(id, listaPreguntas: ListaPregunta) {
    this.listaPreguntasSeleccionadas.push()

  }
  obtenerPartipantes(id) {
    this.indicadoresRequest.idProyecto = id;
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

  onNotificar(event: any, IdPregunta: any) {
     console.log(event, ' - ', IdPregunta)


    this.respuestaIndicadores.forEach(item => {
      if (item.idIndicadorPregunta == IdPregunta) {
        item.Valido = true;
        if (item.Tipo == 1) {
          item.respuestaSi_No = event.name == "No" ? false : true;
        } else if (item.Tipo == 2) {
          item.idComplemento = event.id;
          item.Valido = event.formValid;
          item.Respuesta = event.valorOtro;
          item.esOtro = event.esOtro;
          if (item.esOtro) {

            if (event.formValid) {
              item.Respuesta = event.valorOtro;


            }
          }

        }
      }
    })

    this.validarGuardado()

  }
  AsignarParticipante(id) {
    this.indicadoresRequest.idRegistroParticipante = id;

  }

  seleccionarIndicador() {
    let itemIndicador =
      this.seleccionarIndicador
  }
  validarGuardado() {
    let valido = this.respuestaIndicadores.filter(item => {
      return item.Valido == false;
    })

    this.PermitirGuardar = valido.length == 0 ? true : false

    console.log(this.PermitirGuardar)

    if (this.PermitirGuardar) {
      this.openSnackBar("Ya podemos guardar la información", "");
    }
  }

  Guardar() {

    this.indicadoresRequest.Respuestas = []
    this.indicadoresRequest.Respuestas.push(... this.respuestaIndicadores);
    console.log(this.indicadoresRequest);

    this.indicadorService.GuardarIndicador(this.indicadoresRequest).subscribe(
      OK => { 
        this.registroExitoso();
      },
      ERROR => {
        this.registroNoExitoso("Registro No exitoso", "por favor intentelo nuevamente")

      },
    )

  }

  reiniciarForumulario() {

    this.indicadoresRequest = new IndicadoresRequest();
    this.myStepper.reset();
    this.firstFormGroup.reset()

  }

  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
       this.reiniciarForumulario()
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  registroNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
}
