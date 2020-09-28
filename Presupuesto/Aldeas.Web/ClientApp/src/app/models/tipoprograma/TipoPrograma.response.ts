export interface TipoProgramaResponse {
  data: TipoProgramaResponseData[];
}

export interface TipoProgramaResponseData {
  id:                   number;
  nombre:               string;
  cobertura:            boolean;
  fecha_creacion:       string;
  fecha_actualizacion:  string;
}