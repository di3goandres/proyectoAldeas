// Generated by https://quicktype.io

export interface ProyectoListResponse {
    itemsProyectos: ItemsProyectoList[];
}

export interface ItemsProyectoList {
    id:                 number;
    nombre:             string;
    status:             Status;
    donante:            string;
    tipo_financiacion:  TipoFinanciacion;
    nombre_donante:     string;
    direccion:          string;
    email:              string;
    fecha_inicio:       string;
    fecha_finalizacion: string;
    lider_ejecucion:    string;
    lider_coordinacion: string;
    comite_tecnico:     string;
    archivo:            string;
    nombrearchivo:      string;
    urlReporte :        string;
}

export enum Status {
    PropuestaEnviada = "Propuesta enviada",
    ProyectoEnImplementacion = "Proyecto En Implementacion",
    ProyectoFinalizado = "Proyecto Finalizado",
}

export enum TipoFinanciacion {
    Internacional = "Internacional",
    Nacional = "Nacional",
}
