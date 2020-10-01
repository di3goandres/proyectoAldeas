export interface CargosResponse {
  cargosData: CargosDatum[];
}

export class CargosDatum {
  constructor(){
    this.id =0;
  }
  id:         number;
  tipo:       string;
  cod_cargo:  string;
  cargo:      string;
}