import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { IndicadoresResponse } from '../../models/indicadores/indicadores.response';
import { IndicadoresPreguntasResponse } from '../../models/indicadores/preguntasIndicador.response';

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
}
