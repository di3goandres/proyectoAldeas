import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ProyectoResponse } from '../../models/ProyectoResponse';
import { ProyectoListResponse } from '../../models/proyectos/proyecto.list.response';
import { ItemMunicipioRequest, ItemProyectadosRequest, ItemProyectoRequest, ItemsFechaRequest, UnicoProyecto } from 'src/app/models/proyectos/proyecto.unico.response';
import { EjecucionFinancieraRequest } from '../../models/proyectos/ejecucion.request';
import { Respuesta } from '../../models/comunes';
import { ItemFinancieraRequest } from '../../models/proyectos/proyecto.unico.response';
import { Usuarios, UsuariosResponse } from '../../models/usuarios/Usuarios';

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

  getReporteProyectos(id) {
    return this.service.getUrl() + '/api/proyectos/informe/consultar/' + id;
  }


  getDataExport() {
    this.service.ejecutarQuerFile('/api/proyectos/informe/exportdatabase/');

  }

  ActualizarEjecucion(data: EjecucionFinancieraRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/ejecucion/update/', data);
  }

  ActualizarItemProyecto(data: ItemProyectoRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/itemproyecto/update/', data);
  }

  ActualizarItemFinanciera(data: ItemFinancieraRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/iteminfofinanciera/update/', data);
  }

  ActualizarItemfecha(data: ItemsFechaRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/itemfecha/update/', data);
  }

  ActualizarobserParticipantes(data: ItemProyectadosRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/itemobservaciones/update/', data);
  }

  ActualizarobserListParticipantes(data: ItemProyectadosRequest) {

    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/listparticipante/update/', data);
  }


  ActualizarMunicipio(data: ItemMunicipioRequest) {
    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/proyectos/municipio/update/', data);
  }


  permitirEditar(){
    return this.service.permitirEditar();
  }

  ObtenerUsuarios() {
    return this.service.ejecutarQuery<UsuariosResponse>('/api/user/obtenerusuarios/');
  }

  EliminarUsuario(data: Usuarios) {
    return this.service.ejecutarQueryPostNuevo<Respuesta>('/api/user/eliminarusuario/', data);
  }
}
