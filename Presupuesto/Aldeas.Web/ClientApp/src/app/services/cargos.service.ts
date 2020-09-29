import { Injectable } from '@angular/core';
import { CargosResponse } from '../models/cargos/cargos';
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


}
