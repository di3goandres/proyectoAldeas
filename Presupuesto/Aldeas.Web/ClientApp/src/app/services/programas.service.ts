import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProgramaResponse, Programa, Ceco } from '../models/programas/programas.response';
import { ProgramaRequest } from '../models/programas/programas.request';
import { Respuesta } from '../models/comunes';
import { TipoProgramaResponse } from '../models/tipoprograma/TipoPrograma.response';
import { FinanciadoresResponse } from '../models/financiadores/financiadores.response';
import { UsuarioProgramaResponse } from '../models/usuarios/usuario.programas.response';


@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor(private userService: UserService) { }

  getProgramas() {
    return this.userService.ejecutarQuery<ProgramaResponse>('/api/presupuesto/programas');
  }

  storeProgramas(programas: ProgramaRequest) {
    let json = JSON.stringify(programas);
    let params = '' + json;
    return this.userService
       .ejecutarQueryPost<Respuesta>('/api/presupuesto/programas/Guardar/',params );
  }

  storeCeco(ceco: Ceco) {
    let json = JSON.stringify(ceco);
    let params = '' + json;
    return this.userService
       .ejecutarQueryPost<Respuesta>('/api/presupuesto/programas/addceco/',params );
  }

  updateProgramas(programas: Programa) {
    let json = JSON.stringify(programas);
    let params = '' + json;
    return this.userService
       .ejecutarQueryPost<Respuesta>('/api/presupuesto/programas/actualizar/',params );
  }

  NoExitosoComun(){
    this.userService.registroNoExitosoComun();
  }
  updateCecos(ceco: Ceco) {
    let json = JSON.stringify(ceco);
    let params = '' + json;
    return this.userService
       .ejecutarQueryPost<Respuesta>('/api/presupuesto/ceco/actualizar/',params );
  }


  getTipoProgramas() {
    return this.userService.ejecutarQuery<TipoProgramaResponse>('/api/tipoprograma/get');
  }

  getFinanciadores() {
    return this.userService.ejecutarQuery<FinanciadoresResponse>('/api/financiadores/get');
  }


  
  getProgramasUsuario() {
    return this.userService.ejecutarQuery<UsuarioProgramaResponse>('/api/user/soloprogramastoken' )
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

  MostrarSnack(Mensaje: string){
    this.userService.openSnackBar(Mensaje, "");
  }
}
