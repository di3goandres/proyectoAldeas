import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CategoriaResponse, Categoria, Puc } from '../models/categorias/categoria.response';
import { Respuesta } from '../models/comunes';
import { CategoriaRequest, PucRequest } from '../models/categorias/categoria.request';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private userService: UserService
  ) { }

  getCategorias() {
    return this.userService.ejecutarQuery<CategoriaResponse>('/api/presupuesto/categorias');
  }

  getCategoriasPucs() {
    return this.userService.ejecutarQuery<CategoriaResponse>('/api/presupuesto/categoriaspucs');
  }
  storeCategoria(categoria: CategoriaRequest) {
    let json = JSON.stringify(categoria);
    let params = '' + json;
    return this.userService
      .ejecutarQueryPost<Respuesta>('/api/presupuesto/categoria/create', params);
  }
  storePuc(puc: Puc) {
    let json = JSON.stringify(puc);
    let params = '' + json;
    return this.userService
      .ejecutarQueryPost<Respuesta>('/api/presupuesto/categoria/addpuc', params);
  }
  updateCategoria(categoria: Categoria) {
    let json = JSON.stringify(categoria);
    let params = '' + json;
    return this.userService
      .ejecutarQueryPost<Respuesta>('/api/presupuesto/categoria/update', params);
  }

  
  updatePuc(pucs: Puc) {
    let json = JSON.stringify(pucs);
    let params = '' + json;
    return this.userService
      .ejecutarQueryPost<Respuesta>('/api/presupuesto/pucs/update', params);
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
}
