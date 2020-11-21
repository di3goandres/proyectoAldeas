import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ProyectoResponse } from '../../models/ProyectoResponse';
import { ProyectoListResponse } from '../../models/proyectos/proyecto.list.response';
import { UnicoProyecto } from 'src/app/models/proyectos/proyecto.unico.response';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(
    private service: UserService

  ) { }

  getProyectos() {
    return this.service.ejecutarQuery<ProyectoListResponse>('/api/aldeas/proyectos/obtenerproyectos');
  }

  getProyectosById(id) {
    return this.service.ejecutarQuery<UnicoProyecto>('/api/aldeas/proyectos/obtenerproyectosbyid/' + id);
  }

 
}
