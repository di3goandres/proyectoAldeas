// Generated by https://quicktype.io

export interface RegistroParticipantesResponse {
    registros: RegistroParticipantes[];
}

export interface RegistroParticipantes {
    id:                  number;
    idProyecto:          number;
    idMunicipio:         string;
    municipio:           string;
    idDepartamento:      string;   

    departamento:        string;   

    nombres:             string;
    apellidos:           string;

    fechaNacimiento:     Date;
    edad:                number;
    fechaIngreso:        Date;
    fechaSalida:         Date;
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
    discapacidad:        string;
    nivelEscolaridad:    string;
}
