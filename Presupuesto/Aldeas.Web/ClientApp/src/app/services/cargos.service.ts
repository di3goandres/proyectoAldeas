import { Injectable } from '@angular/core';
import { CargosResponse, CargosDatum } from '../models/cargos/cargos';
import { Respuesta } from '../models/comunes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(
    private userService: UserService
  ) { }

  getCargos() {
    return this.userService.ejecutarQuery<CargosResponse>('/api/cargos/get')
  }

  guardarCargos(data : CargosDatum) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/cargos/save', params)
  }

  updateCargos(data : CargosDatum) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/cargos/update', params)
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
}
