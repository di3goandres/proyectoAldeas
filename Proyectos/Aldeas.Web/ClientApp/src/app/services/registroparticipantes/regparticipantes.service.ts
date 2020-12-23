import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { RegistroParticipantesResponse } from '../../models/registroparticipantes/registro.participantes.response';
import { DetalleParticipanteResponse, IntegrantesFamilia } from '../../models/registroparticipantes/participante.response';
import { Respuesta } from '../../models/comunes';
import { RegistroParticipante } from 'src/app/models/DatosPartipante';
import { IntegrantesUpdate } from '../../models/registroparticipantes/integrantes.request';

@Injectable({
  providedIn: 'root'
})
export class RegparticipantesService {

  constructor(
    private service: UserService
  ) { }


  obtenerParticipantes(id) {
    return this.service
      .ejecutarQuery<RegistroParticipantesResponse>('/api/aldeas/proyectos/obtenerparticipantes/' + id);
  }

  obtenerDetalleParticioante(id){
    return this.service
    .ejecutarQuery<DetalleParticipanteResponse>('/api/aldeas/participante/obtenerdetalleparticipante/' + id);
  }

  ActualizaParticipante(data: RegistroParticipante){
    let json = JSON.stringify(data);
    let params =  json;
  
    return this.service
    .ejecutarQueryPost<Respuesta>('/api/aldeas/participante/update/', params);
  }

  actualizarIntegrantes(data: IntegrantesUpdate){
    let json = JSON.stringify(data);
    let params =  json;
  
    return this.service
    .ejecutarQueryPost<Respuesta>('/api/aldeas/participante/integrantes/update/', params);
  }


  permitirEditar(){
    return this.service.permitirEditar();
  }
}
