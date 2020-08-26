
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

export class Ceco {
  constructor(){
  this.id = 0
  this.idPrograma = 0
  this.codigoCeco = 0
  this.nombre = ""
  this.subCentro = 0
  this.nombreSubCentro = ""
  this.facilityNav = ""
  this.estado = true;
  }
  id: number;
  idPrograma: number;
  codigoCeco: number;
  nombre: string;
  subCentro: number;
  nombreSubCentro: string;
  facilityNav: string;
  estado: boolean;
}