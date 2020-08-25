
export interface ProgramaResponse {
  cecos: Ceco[];
  programas: Programa[];
}

export interface Programa {
  id: number;
  nombre: string;
  estado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Ceco {
  id: number;
  idPrograma: number;
  codigoCeco: number;
  nombre: string;
  subCentro: number;
  nombreSubCentro: string;
  facilityNav: string;
  estado: boolean;
}