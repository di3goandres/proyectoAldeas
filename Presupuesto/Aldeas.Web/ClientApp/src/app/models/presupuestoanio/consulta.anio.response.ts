export interface CoberturaAnioResponse {
  programa: ProgramaCobertura;
  presupuesto: PresupuestoCobertura[];
}

export interface PresupuestoCobertura {
  id: number;
  idPrograma: number;
  nombrePrograma: string;
  nombreContrato: string;
  financiador: string;
  anio: number;
  coberturaAnual: number;
  coberturaMensual: number;
  coberturaMensualEsperada: number;
  coberturasCasas: number;
}



export interface ProgramaCobertura {
  id: number;
  nombre: string;
  idTipoPrograma: number;
  tipoProgramaNombre: string;
  cobertura: boolean;
  perNomina: number;
  perCapacitacion: number;
  estado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}


