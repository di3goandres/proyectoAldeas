import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';

@Component({
  selector: 'app-descargarbasedatos',
  templateUrl: './descargarbasedatos.component.html',
  styleUrls: ['./descargarbasedatos.component.css']
})
export class DescargarbasedatosComponent implements OnInit {

  constructor(private service: ProyectoService) { }

  ngOnInit(): void {
  
  }

  descargar(){

    this.service.getDataExport()
     
    
    // });
        
  }
}
