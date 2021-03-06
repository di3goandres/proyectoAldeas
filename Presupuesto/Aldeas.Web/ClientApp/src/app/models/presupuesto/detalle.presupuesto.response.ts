// Generated by https://quicktype.io

// export interface // Generated by https://quicktype.io

// export interface DetallePresupuestoResponse {

// Generated by https://quicktype.io

export interface DetallePresupuestoResponse {
    detallePresupuesto: Detalle[];
}

export class Detalle {
    constructor(){}
    id:                   number;
    idPresupuesto:        number;

    programa:             string;
    anio:                 number;
    centroCosto:          number;
    subCentroCosto:       number;
    nombreRubro:          string;
    esNomina:             boolean;
    esPptp:               boolean;
    cargo:                string;
    cuentaSIIGO:          string;
    nombreCuenta:         string;
    cuentaCotable:        string;
    facility:             string;
    detalleGasto:         string;
    notaIngles:           null | string;
    noCasa:               number;
    noKids:               number;
    numeroIdentificacion: number;
    nombre:               string;
    asignacion:           number;
    enero:                number;
    febrero:              number;
    marzo:                number;
    abril:                number;
    mayo:                 number;
    junio:                number;
    julio:                number;
    agosto:               number;
    septiembre:           number;
    octubre:              number;
    noviembre:            number;
    diciembre:            number;
    total:                number;

}
