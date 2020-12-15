import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { RegparticipantesService } from '../../../services/registroparticipantes/regparticipantes.service';
import { IntegrantesFamilia, Pregunta } from '../../../models/registroparticipantes/participante.response';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarparticipanteComponent } from '../actualizarparticipante/actualizarparticipante.component';
import { RegistroParticipante } from '../../../models/DatosPartipante';
import { Task } from '../../../models/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntegrantesUpdate } from '../../../models/registroparticipantes/integrantes.request';


@Component({
  selector: 'app-verproyectosparticipantes',
  templateUrl: './verproyectosparticipantes.component.html',
  styleUrls: ['./verproyectosparticipantes.component.css']
})
export class VerproyectosparticipantesComponent implements OnInit {
  formGroupIntegrantes: FormGroup;

  displayedColumns: string[] = ['position', 'nombre', 'apellidos', 'fechaNacimiento',
    'departamento', 'municipio', 'detalle']
  displayedColumnsParticipante: string[] =
    ['position', '0 - 5 Años', '6 - 12 años',
      '13 - 15 años', '18 - 24 años', '25 - 56 años',
      'Mayores de 60 años', 'Total']


  displayedColumnsPreguntas: string[] =
    ['position', 'Pregunta', 'Respuesta',
      'esOtro']
  idProyecto: string;
  participantes: RegistroParticipantes[];
  preguntas: Pregunta[];
  idParticipante = 0;
  integrantes: IntegrantesFamilia[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  seleccionado: RegistroParticipantes;
  seleccionadoUpdate: RegistroParticipante;

  dataSource = new MatTableDataSource<RegistroParticipantes>();
  constructor(
    private _formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private service: IndicadoresService,
    private servicParticipantes: RegparticipantesService,
    private modalService: NgbModal,
    // private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();
    this.formGroupIntegrantes = this._formBuilder.group({

      rango_0_5: ['', [Validators.min(0)]],
      rango_6_12: ['', [Validators.min(0)]],
      rango_13_17: ['', [Validators.min(0)]],
      rango_18_24: ['', [Validators.min(0)]],
      rango_25_56: ['', [Validators.min(0)]],
      mayores_60: ['', [Validators.min(0)]],
      total: ['', [Validators.nullValidator]],



    });
  }

  cargaInicial() {
    this.service.obtenerParticipantes(this.idProyecto).subscribe(
      OK => {
        console.log(OK)
        this.participantes = [],
          this.participantes.push(...OK.registros)
        this.dataSource = new MatTableDataSource(this.participantes);
        this.dataSource.paginator = this.paginator;
      },
      ERROR => { console.log(ERROR) },
    )
  }

  Ver(informe: RegistroParticipantes) {
    this.idParticipante = informe.id;
    this.obtenerDetalle()

  }

  obtenerDetalle() {
    this.servicParticipantes.obtenerDetalleParticioante(this.idParticipante).subscribe(
      OK => {

        console.log(OK);
        this.seleccionado = OK.participante;
        this.mapearUpdate();
        this.integrantes = [];
        this.integrantes.push(...OK.integrantesFamilia)
        this.preguntas = [];
        this.preguntas.push(...OK.preguntas)
        this.stepper.next()

      },
      ERROR => { console.log(ERROR) },
    )
  }

  mapearUpdate() {
    this.seleccionadoUpdate = new RegistroParticipante();
    this.seleccionadoUpdate.id = this.seleccionado.id;
    this.seleccionadoUpdate.FechaIngreso = this.seleccionado.fechaIngreso;
    this.seleccionadoUpdate.CodMunicipio = this.seleccionado.idMunicipio;
    this.seleccionadoUpdate.CodDepartamento = this.seleccionado.idDepartamento;

    this.seleccionadoUpdate.Nombres = this.seleccionado.nombres;
    this.seleccionadoUpdate.Apellidos = this.seleccionado.apellidos;
    this.seleccionadoUpdate.FechaNacimiento = this.seleccionado.fechaNacimiento;
    this.seleccionadoUpdate.Edad = this.seleccionado.edad;

    this.seleccionadoUpdate.FechaIngreso = this.seleccionado.fechaIngreso;

    this.seleccionadoUpdate.FechaSalida = this.seleccionado.fechaSalida;
    this.seleccionadoUpdate.Localidad = this.seleccionado.localidad;
    this.seleccionadoUpdate.Sexo = this.seleccionado.sexo;
    this.seleccionadoUpdate.EstatusResidencia = this.seleccionado.estatusResidencia;
    this.seleccionadoUpdate.UltimoCursoAprobado = this.seleccionado.ultimoCursoAprobado;
    this.seleccionadoUpdate.AsisteAlColegio = this.seleccionado.asisteAlColegio;
    this.seleccionadoUpdate.GrupoPoblacional = this.seleccionado.grupoPoblacional;
    this.seleccionadoUpdate.GrupoEtnico = this.seleccionado.grupoEtnico;
    this.seleccionadoUpdate.Nacionalidad = this.seleccionado.nacionalidad;
    this.seleccionadoUpdate.Genero = this.seleccionado.genero;
    this.seleccionadoUpdate.TipoParticipante = this.seleccionado.tipoParticipante;
    this.seleccionadoUpdate.Discapacidad = this.seleccionado.discapacidad;
    this.seleccionadoUpdate.NivelEscolaridad = this.seleccionado.nivelEscolaridad;










  }
  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {

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

  ActualizarParticipante() {
    this.cuadrarTask();
    console.log(this.seleccionadoUpdate)
    const modalRef = this.modalService.open(ActualizarparticipanteComponent, { size: 'xl' });
    modalRef.componentInstance.datosParticipante = this.seleccionadoUpdate;



    const pre = this.preguntas.filter(t => t.pregunta == "Linea del Proyecto");
    modalRef.componentInstance.preguntas = pre;
    modalRef.componentInstance.task = this.task;



    modalRef.result.then((result) => {

      if (result == "OK") {
        this.obtenerDetalle()
      }
    }, (reason) => {


    });
  }

  task: Task;
  cuadrarTask() {
    this.task = new Task('Linea del Proyecto', 'Línea del Proyecto (Opción Multiple)', false, false, 'primary');

    this.task.subtasks = [
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Educación en Emergencias', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Traslado Humanitario', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Acogimiento Transitorio', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'ICT Corner', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Fortalecimiento Familiar', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Fortalecimiento Comunitario', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Espacios Amigables', esOtro: false, completed: false, color: 'primary' },
      { id: 0, pregunta: 'Linea del Proyecto', name: 'Otro', esOtro: true, completed: false, color: 'primary' },
    ]
    // };



    this.updateTask();


  }

  updateTask() {

    this.task.subtasks.forEach(
      t => {
        let existe = this.preguntas.filter(pregunta => {
          return pregunta.valor == t.name
        })

        if (existe.length > 0) {
          t.completed = true;
        }


      })





  }

  @ViewChild('Integrantes') TableIntegrantes: MatTable<any>;

  actualizar() {

    this.integrantes.forEach(

      t => {
        if (!t.mayores_60) {
          t.mayores_60 = 0
        }
        if (!t.rango_13_17) {
          t.rango_13_17 = 0
        }
        if (!t.rango_18_24) {
          t.rango_18_24 = 0
        }
        if (!t.rango_25_56) {
          t.rango_25_56 = 0
        }
        if (!t.rango_6_12) {
          t.rango_6_12 = 0
        }
        if (!t.rango_0_5) {
          t.rango_0_5 = 0
        }
        t.total = t.rango_13_17 + t.rango_18_24 + t.rango_25_56 + t.rango_6_12 + t.mayores_60 + t.rango_0_5;

      });

    console.log(this.integrantes)
    this.TableIntegrantes.renderRows()
  }
  integrantesUpdate = new IntegrantesUpdate();
  ActualizarIntegrantes() {
    this.integrantesUpdate.IntegrantesFamilia = [];
    this.integrantesUpdate.IntegrantesFamilia.push(...this.integrantes);
    this.servicParticipantes.actualizarIntegrantes(this.integrantesUpdate).subscribe(
      OK => {
        console.log(OK)

        this.registroExitoso();
        this.obtenerDetalle();

      },
      ERROR => { console.log(ERROR)
      
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      },
    )
  }

}
