import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';

@Component({
  selector: 'app-verproyectosparticipantes',
  templateUrl: './verproyectosparticipantes.component.html',
  styleUrls: ['./verproyectosparticipantes.component.css']
})
export class VerproyectosparticipantesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nombre', 'apellidos','fechaNacimiento',
     'departamento','municipio', 'detalle']

  idProyecto: string;
  participantes: RegistroParticipantes[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  seleccionado: RegistroParticipantes;
  dataSource = new MatTableDataSource<RegistroParticipantes>();
  constructor(
    private route: ActivatedRoute,
    private service: IndicadoresService

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
    this.seleccionado = informe;

    this.stepper.next()


  }

}
