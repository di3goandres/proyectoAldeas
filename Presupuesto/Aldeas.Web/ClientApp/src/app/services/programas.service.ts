import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ProgramaResponse } from '../models/programas/programas.response';


@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor(private userService: UserService) { }

  getProgramas() {
    return this.userService.ejecutarQuery<ProgramaResponse>('/api/presupuesto/programas');
  }
}
