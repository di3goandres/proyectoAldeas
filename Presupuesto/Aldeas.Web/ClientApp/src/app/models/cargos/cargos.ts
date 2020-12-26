export interface CargosResponse {
  cargosData: CargosDatum[];
}

export class CargosDatum {
  constructor(){
    this.id =0;
    this.tipo = ''
  }
  id:         number;
  tipo:       string;
  cod_cargo:  string;
  cargo:      string;
}