import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ColaboradorResponse } from '../../models/colaborardor/colaborador.response';
import { ColaboradorDetalleResponse } from '../../models/colaborardor/colaborador.detalle';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(
    private service: UserService

  ) { }

  ObtenerColaboradores(id) {
    return this.service
      .ejecutarQuery<ColaboradorResponse>('/api/aldeas/proyecto/obtenercolaboradores/' + id);
  }

  obtenerDetalleColaborador(id){
    return this.service
    .ejecutarQuery<ColaboradorDetalleResponse>('/api/aldeas/colaborador/detalle/' + id);
  }
}
