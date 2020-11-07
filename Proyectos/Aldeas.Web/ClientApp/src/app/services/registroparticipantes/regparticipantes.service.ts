import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { RegistroParticipantesResponse } from '../../models/registroparticipantes/registro.participantes.response';

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
}
