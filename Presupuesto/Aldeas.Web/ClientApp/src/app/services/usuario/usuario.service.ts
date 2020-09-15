import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { UsuariosResponse, Usuario } from '../../models/usuarios/usuarios.response';
import { Respuesta } from '../../models/comunes';
import { UsuarioProgramaResponse } from '../../models/usuarios/usuario.programas.response';
import { UsuarioProgramaEnvioRequest, UsuarioProgramaRequest } from '../../models/usuarios/usuario.programa.request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private userService: UserService) { }

  getListUsuarios() {
    return this.userService.ejecutarQuery<UsuariosResponse>('/api/user/listar/')
  }

  gerProgramas(id) {
    return this.userService.ejecutarQuery<UsuarioProgramaResponse>('/api/user/soloprogramas/' +id)
  }

  asociarPrograma(data: UsuarioProgramaRequest[]) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/user/asociarPrograma/', params)
  }

  quitarPrograma(data: UsuarioProgramaRequest[]) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/user/quitarPrograma/', params)
  }

  guardarUsuario(data: Usuario) {
    let json = JSON.stringify(data);
    let params = '' + json;
    return this.userService.ejecutarQueryPost<Respuesta>('/api/user/agregar/', params)
  }
  getListProgramasUsuarios(id) {
    return this.userService.ejecutarQuery<UsuarioProgramaResponse>('/api/user/listarProgramas/'+id)
  }
}
