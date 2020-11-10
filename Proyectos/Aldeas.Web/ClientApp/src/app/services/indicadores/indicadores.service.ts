import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { IndicadoresResponse } from '../../models/indicadores/indicadores.response';
import { IndicadoresPreguntasResponse } from '../../models/indicadores/preguntasIndicador.response';
import { IndicadoresRequest } from '../../models/indicadores/Respuesta.Indicadores';
import { Respuesta } from '../../models/comunes';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(
    private service: UserService

  ) { }

  ObtenerIndicadores() {
    return this.service
      .ejecutarQuery<IndicadoresResponse>('/api/aldeas/indicadores/obtener');
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
}
