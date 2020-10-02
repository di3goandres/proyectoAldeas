export interface PresupuestoAnioResponse {
  presupuestoAnioData: PresupuestoAnioDatum[];
}

export class PresupuestoAnioDatum {
  id: number;
  idPrograma: number;
  nombrePrograma: string;
  tipoPrograma: string;
  cobertura: boolean;
  anio: number;
  actual: boolean;
  numeroVersion: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}