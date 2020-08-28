export interface CategoriaResponse {
    categorias: Categoria[];
    pucs:       Puc[];
}

export class Categoria {
    id:                 number;
    nombre:             string;
    estado:             boolean;
    fechaCreacion:      string;
    fechaActualizacion: string;
}

export class Puc {
    id:                 number;
    idCategoria:        number;
    tipo:               string;//Tipo;
    cuentaSIIGO:        string;
    descripcionCuenta:  string;
    cuentaNAV:          string;
    detalleCuentaNav:   string;
    tipoCuentaNav:      string;//TipoCuentaNav;
    fichaBanco:         string;//FichaBanco;
    casa:               number;
    requiereNotaIngles: boolean;
    estado:             boolean;
    fechaCreacion:      string;
    fechaActualizacion: string;
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
