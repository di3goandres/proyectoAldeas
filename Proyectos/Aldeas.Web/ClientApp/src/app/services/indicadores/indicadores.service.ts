import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { IndicadoresResponse } from '../../models/indicadores/indicadores.response';
import { IndicadoresPreguntasResponse } from '../../models/indicadores/preguntasIndicador.response';
import { IndicadoresRequest } from '../../models/indicadores/Respuesta.Indicadores';
import { Respuesta } from '../../models/comunes';
import { ProyectoResponse } from '../../models/ProyectoResponse';
import { RegistroParticipantesResponse } from '../../models/registroparticipantes/registro.participantes.response';
import { RespuestaIndicadoresResponse } from 'src/app/models/indicadores/Respuesta.indicadores.response';
import { RespuestasResponse } from '../../models/indicadores/Respuestas.response';
import { ParticipantesCopiaRequest } from '../../models/registroparticipantes/participantes.disponibles';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(
    private service: UserService

  ) { }
  obtenerParticipantes(id) {
    return this.service
      .ejecutarQuery<RegistroParticipantesResponse>('/api/aldeas/proyectos/obtenerparticipantes/' + id);
  }

  obtenerParticipantesDisponibles(data: ParticipantesCopiaRequest) {
    return this.service
      .ejecutarQueryPostNuevo<RegistroParticipantesResponse>('/api/aldeas/participante/disponibles/', data);
  }
  ObtenerIndicadores() {
    return this.service
      .ejecutarQuery<IndicadoresResponse>('/api/aldeas/indicadores/obtener');
  }

  ObtenerIndicadoresParticipante(id) {
    return this.service
      .ejecutarQuery<RespuestaIndicadoresResponse>('/api/aldeas/indicadores/obteneindicadorparticipante/' + id);
  }

  ObtenerPreguntasIndicadores(id) {
    return this.service
      .ejecutarQuery<IndicadoresPreguntasResponse>('/api/aldeas/indicadores/obtenerpreguntas/' + id);
  }

  GuardarIndicador(data: IndicadoresRequest) {
     let json = JSON.stringify(data);
    let params = '' + json;

    console.log(params)
    return this.service
    .ejecutarQueryPost<Respuesta>('/api/aldeas/indicadores/GuardarRespuestas/', params);
  }

  getProyectos() {
    return this.service.ejecutarQuery<ProyectoResponse>('/api/aldeas/datosproyectos');
  }

  ObtenerRespuestasIndicadores(participante, indicador) {
    return this.service
      .ejecutarQuery<RespuestasResponse>('/api/aldeas/indicadores/obtenerespuestas/' + participante + '/'+indicador);
  }
}
