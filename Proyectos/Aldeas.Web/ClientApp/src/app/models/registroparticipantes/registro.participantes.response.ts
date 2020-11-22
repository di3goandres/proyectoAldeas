// Generated by https://quicktype.io

export interface RegistroParticipantesResponse {
    registros: RegistroParticipantes[];
}

export interface RegistroParticipantes {
    id:                  number;
    idProyecto:          number;
    idMunicipio:         number;
    municipio:           string;
    departamento:        string;   

    nombres:             string;
    apellidos:           string;

    fechaNacimiento:     string;
    edad:                number;
    fechaIngreso:        string;
    fechaSalida:         string;
    localidad:           string;
    sexo:                string;
    estatusResidencia:   string;
    ultimoCursoAprobado: string;
    asisteAlColegio:     string;
    grupoPoblacional:    string;
    grupoEtnico:         string;
    nacionalidad:        string;
    genero:              string;
    tipoParticipante:    string;
    discapacidad:        boolean;
    nivelEscolaridad:    string;
}
