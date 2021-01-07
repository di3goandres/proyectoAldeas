import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PresupuestoResponse } from '../models/presupuesto/data.presupuesto.response';

import { ListaPresupuestoResponse, PresupuestoListRequest, PresupuestoL } from '../models/presupuesto/list.presupuesto.response';
import { DetallePresupuestoResponse } from '../models/presupuesto/detalle.presupuesto.response';
import { PresupuestoRequest } from '../models/presupuesto/data.presupuesto.request';
import { Respuesta } from '../models/comunes';
import { PresupuestoAnioResponse, PresupuestoAnioDatum } from '../models/presupuestoanio/anio.response';

import { FinanciadoresResponse } from '../models/financiadores/financiadores.response';
import { CoberturaAnioResponse } from '../models/presupuestoanio/consulta.anio.response';
import { CoberturaRequest } from '../models/cobertura/Cobertura.request';
import { ProgramaResponse } from '../models/programas/programas.response';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(private userService: UserService,
    ) { }


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

    return this.userService.ejecutarQuery<DetallePresupuestoResponse>('/api/presupuesto/getdetalle/' + id)
  }


 borrarDetallePresupuesto(id) {

    return this.userService.ejecutarQuery<Respuesta>('/api/presupuestoanio/borrardetalle/' + id)
  }

  guardarPresupuesto(data: PresupuestoRequest) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/presupuesto/storedetalle/', params)
  }

  guardarPresupuestoSinCobertura(data: PresupuestoRequest) {
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

    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/presupuesto/store/', data)
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

    return this.userService.ejecutarQuery<FinanciadoresResponse>('/api/presupuestoanio/faltante/' + id)
  }


  getFinanciadoresCobertura(id) {

    return this.userService.ejecutarQuery<CoberturaAnioResponse>('/api/presupuestoanio/consultaranio/' + id)
  }

  gerReporte(id) {
    return this.userService.getUrl() + '/api/generarinforme/consultar/' + id;
  }
  
  permitirEditar(){
    return this.userService.permitirEditar();
  }

  Exitoso(){
    this.userService.registroExitoso();
  }

  NoExitoso(Titulo, Mensaje){
    this.userService.registroNoExitoso(Titulo, Mensaje);
  }

  NoExitosoComun(){
    this.userService.registroNoExitosoComun();
  }


  getCoberturas(data: CoberturaRequest) {
    return this.userService.ejecutarQueryPostNuevo<CoberturaAnioResponse>('/api/aldeas/gestion/presupuesto/consultar/coberturas',data)
  }

  MostrarSnack(Mensaje: string){
    this.userService.openSnackBar(Mensaje, "");
  }


  tomarVersion(data: PresupuestoListRequest) {
  
    return this.userService.ejecutarQueryPostNuevo<Respuesta>('/api/aldeas/gestion/presupuesto/versionar/', data)
  }


  getProgramasVersion() {

    return this.userService.ejecutarQuery<ProgramaResponse>('/api/aldeas/gestion/presupuesto/versionar/programas/')
  }
}
