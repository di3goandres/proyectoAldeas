export interface PresupuestoAnioResponse {
  presupuestoAnioData: PresupuestoAnioDatum[];
  idPrograma: number;
  nombrePrograma: string;

}

export class PresupuestoAnioDatum {
  id: number;
  idPrograma: number;
  nombrePrograma: string;
  tipoPrograma: string;
  cobertura: boolean;
  anio: number;
  actual: boolean;
  urlReporte: string;
  per_capacitacion:number;
  per_nomina: number;
  numeroVersion: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}