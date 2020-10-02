import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PresupuestoResponse } from '../models/presupuesto/data.presupuesto.response';

import { ListaPresupuestoResponse, PresupuestoListRequest, PresupuestoL } from '../models/presupuesto/list.presupuesto.response';
import { DetallePresupuestoResponse } from '../models/presupuesto/detalle.presupuesto.response';
import { PresupuestoRequest } from '../models/presupuesto/data.presupuesto.request';
import { Respuesta } from '../models/comunes';
import { PresupuestoAnioResponse, PresupuestoAnioDatum } from '../models/presupuestoanio/anio.response';
import { FinanciadorFaltanteResponse } from '../models/financiadores/financiadorFaltante.response';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(private userService: UserService) { }


  getDataInicial(id) {
    return this.userService.ejecutarQuery<PresupuestoResponse>('/api/presupuesto/getinfodata/' + id)
  }

  
  getDataPucsRubro(id) {
    return this.userService.ejecutarQuery<PresupuestoResponse>('/api/presupuesto/getlistpuc/' + id)
  }
  getPresupuestoByProgram(data: PresupuestoListRequest) {
    let json = JSON.stringify(data);
    let params = '' + json;
    
    return this.userService.ejecutarQueryPost<ListaPresupuestoResponse>('/api/presupuesto/getlistpresupuestobyProgram/', params)
  }

  getDetallePresupuesto(id) {
  
    return this.userService.ejecutarQuery<DetallePresupuestoResponse>('/api/presupuesto/getdetalle/'+id)
  }

  guardarPresupuesto(data: PresupuestoRequest) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuesto/storedetalle/', params)
  }

  updatePresupuesto(data: PresupuestoRequest) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuesto/updatedetalle/', params)
  }

  guardar(data: PresupuestoL) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuesto/store/', params)
  }
  update(data: PresupuestoL) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuesto/update/', params)
  }


  getPresupuestoPrograma(id) {
    
    return this.userService.ejecutarQuery<PresupuestoAnioResponse>('/api/presupuestoanio/consultar/' + id)
  }

  guardarPresupuestoAnio(data: PresupuestoAnioDatum) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuestoanio/save/', params)
  }

  getFinanciadoresFaltantes(id) {
   
    return this.userService.ejecutarQuery<FinanciadorFaltanteResponse>('/api/presupuestoanio/faltante/' +id)
  }
}
