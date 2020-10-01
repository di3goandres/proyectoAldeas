export interface FinanciadoresResponse {
  financiadoresData: FinanciadoresDatum[];
}

export interface FinanciadoresDatum {
  id: number;
  nombre: string;
  estado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}