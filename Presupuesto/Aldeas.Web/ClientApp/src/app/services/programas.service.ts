import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProgramaResponse } from '../models/programas/programas.response';
import { ProgramaRequest } from '../models/programas/programas.request';
import { Respuesta } from '../models/comunes';


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
}
