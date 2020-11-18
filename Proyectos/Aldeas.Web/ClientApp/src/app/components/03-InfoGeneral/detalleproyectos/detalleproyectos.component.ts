import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProyectoService } from 'src/app/services/proyectos/proyecto.service';
import { ItemsFecha } from '../../../models/proyectos/proyecto.unico.response';


@Component({
  selector: 'app-detalleproyectos',
  templateUrl: './detalleproyectos.component.html',
  styleUrls: ['./detalleproyectos.component.css']
})
export class DetalleproyectosComponent implements OnInit {
  fechas: ItemsFecha[] = []
 
  fechasMostrar$=   new BehaviorSubject(this.fechas);


  idProyecto: string;
  default: "COMITES"
  constructor(
    private route: ActivatedRoute,
    private service: ProyectoService,
    private changeDetectorRefs: ChangeDetectorRef


  ) { }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.paramMap.get('id');
    this.cargaInicial();

  }


  cargaInicial() {
    this.service.getProyectosById(this.idProyecto).subscribe(
      OK => {
        console.log(OK)

        this.fechas = [];
        this.fechas.push(...OK.itemsFechas)


        this.fechasMostrar$.next(this.fechas.filter(item => item.tipo_fecha.toUpperCase() == this.default));
      
      
         this.changeDetectorRefs.detectChanges();

      },
      ERROR => { console.log(ERROR) },
    )
  }


  cambioTab(event) {
    console.log(event.tab.textLabel)
    this.default = event.tab.textLabel
    this.fechasMostrar$.next(this.fechas.filter(item => item.tipo_fecha.toUpperCase() == this.default));

  
    this.changeDetectorRefs.detectChanges();

  }


}
