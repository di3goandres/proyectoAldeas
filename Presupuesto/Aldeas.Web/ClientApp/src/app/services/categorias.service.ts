import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CategoriaResponse, Categoria, Puc } from '../models/categorias/categoria.response';
import { Respuesta } from '../models/comunes';

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
}
