import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { ColaboradorResponse, ItemsColaboradores } from '../../models/colaborardor/colaborador.response';
import { ColaboradorDetalleResponse } from '../../models/colaborardor/colaborador.detalle';
import { Respuesta } from '../../models/comunes';

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

  actualizarCeco(id, ceco){
    return this.service
    .ejecutarQuery<Respuesta>('/api/aldeas/colaborador/updatececos/' + id+'/'+ceco);
  }


  actualizarColaborador(data : ItemsColaboradores){
    let json = JSON.stringify(data);
    let params =  json;
    return this.service
    .ejecutarQueryPost<Respuesta>('/api/aldeas/colaborador/update/', params);
  }


  permitirEditar(){
    return this.service.permitirEditar();
  }
}
