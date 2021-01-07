import { Component, OnInit } from '@angular/core';
import { Programa } from '../../../../models/programas/programas.response';
import { PresupuestoService } from '../../../../services/presupuesto.service';

@Component({
  selector: 'app-listaversiones',
  templateUrl: './listaversiones.component.html',
  styleUrls: ['./listaversiones.component.css']
})
export class ListaversionesComponent implements OnInit {
  programas: Programa[];

  constructor(public service: PresupuestoService) { }

  ngOnInit(): void {
    this. cargaInicial();
  }
  changePrograma(value){

  }

  onGuardar(){

  }
  cargaInicial() {
    this.service.getProgramasVersion().subscribe(
      OK => { 
        this.programas = [];
        this.programas.push(...OK.programas);

       },
      ERROR => { 


        this.service.NoExitosoComun();
       },
    )
  }

}
