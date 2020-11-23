import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { RegistroParticipantesResponse } from '../../models/registroparticipantes/registro.participantes.response';
import { DetalleParticipanteResponse } from '../../models/registroparticipantes/participante.response';

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
}
