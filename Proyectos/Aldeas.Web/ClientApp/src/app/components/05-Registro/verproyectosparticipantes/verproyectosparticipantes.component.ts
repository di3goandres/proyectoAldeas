import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { RegparticipantesService } from '../../../services/registroparticipantes/regparticipantes.service';
import { IntegrantesFamilia, Pregunta } from '../../../models/registroparticipantes/participante.response';

@Component({
  selector: 'app-verproyectosparticipantes',
  templateUrl: './verproyectosparticipantes.component.html',
  styleUrls: ['./verproyectosparticipantes.component.css']
})
export class VerproyectosparticipantesComponent implements OnInit {

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

  integrantes: IntegrantesFamilia[] =[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  seleccionado: RegistroParticipantes;
  dataSource = new MatTableDataSource<RegistroParticipantes>();
  constructor(
    private route: ActivatedRoute,
    private service: IndicadoresService,
    private servicParticipantes: RegparticipantesService

  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();
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

    this.servicParticipantes.obtenerDetalleParticioante(informe.id).subscribe(
          OK => {

            console.log(OK);
            this.seleccionado = OK.participante;
            this.integrantes = [];
            this.integrantes.push(...OK.integrantesFamilia)
            this.preguntas= [];
            this.preguntas.push(...OK.preguntas)
            this.stepper.next()

          },
          ERROR => {console.log(ERROR)},
        )



  }

}
