export interface CargosResponse {
  cargosData: CargosDatum[];
}

export interface CargosDatum {
  id: number;
  tipo: string;
  cod_cargo: string;
  cargo: string;
}