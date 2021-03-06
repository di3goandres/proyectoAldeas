// Generated by https://quicktype.io
// Generated by https://quicktype.io

export interface PresupuestoResponse {
    cecos:              PresupuestoCeco[];
    presupuestoSubCeco: PresupuestoSubCeco[];
    programas:          PresupuestoPrograma[];
    categorias:         PresupuestoCategoria[];
    pucs:               PresupuestoPuc[];
}

export class PresupuestoCategoria {
    id:       number;
    nombre:   string;
    esppto:   boolean;
    esNomina: boolean;
}

export interface PresupuestoCeco {
    idPrograma: number;
    codigoCeco: number;
    nombre:     string;
}

export interface PresupuestoSubCeco {
    id:              number;
    idCeco:          number;
    subCentro:       number;
    nombreSubCentro: string;
    facilityNav:     string;
}

export interface PresupuestoPrograma {
    id:     number;
    nombre: string;
    financiador: string;

}

export class PresupuestoPuc {
    constructor(){
        this.id = 0
    }
    id:                 number;
    idCategoria:        number;
    tipo:               string;
    cuentaSIIGO:        string;
    descripcionCuenta:  string;
    cuentaNAV:          string;
    detalleCuentaNav:   string;
    tipoCuentaNav:      string;
    fichaBanco:         string; 
    casa:               number;
    requiereNotaIngles: boolean;
}

export enum FichaBanco {
    Empty = "",
    SinCrearEnNav = "sin crear en nav",
}

export enum Tipo {
    SegúnCargo = "Según Cargo",
    UnoAUno = "Uno a Uno",
}

export enum TipoCuentaNav {
    Cuenta = "Cuenta",
    Empty = "",
    Ficha = "FICHA",
}
