
export interface ConsultaDepartamentos {
    departamentos: Departamento[];
    municipios:    Municipio[];
}

export interface Departamento {
    codigo: number;
    nombre: string;
}

export interface Municipio {
    codigo:             number;
    activo:             boolean;
    codigoDepartamento: number;
    nombre:             string;
}
