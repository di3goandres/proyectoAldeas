import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { PresupuestoResponse } from '../models/presupuesto/data.presupuesto.response';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(private userService: UserService) { }


  getDataInicial(){
    return this.userService.ejecutarQuery<PresupuestoResponse>('/api/presupuesto/getinfodata/') }
}
