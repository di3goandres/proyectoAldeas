// Generated by https://quicktype.io

// export interface RespuestasResponse {
//     respuestasIndicadoresParticipante: RespuestasIndicadoresParticipante[];
// }

// export interface RespuestasIndicadoresParticipante {
//     idRespuesta:   number;
//     idPregunta:    number;
//     idComplemento: null;
//     indicador:     string;
//     pregunta:      string;
//     tipoPregunta:  number;
//     esOtro:        boolean;
//     respuestaOTRA: string;
//     valorOtra:     null;
//     respuestaSiNO: boolean | null;
// }

// Generated by https://quicktype.io

export interface RespuestasResponse {
    indicador:                         Indicador[];
    respuestasIndicadoresParticipante: RespuestasIndicadoresParticipante[];
}

export interface Indicador {
    id:        number;
    indicador: string;
}

export interface RespuestasIndicadoresParticipante {
    idRespuesta:   number;
    idPregunta:    number;
    idComplemento: number | null;
    idIndicador:   number;
    indicador:     string;
    pregunta:      string;
    tipoPregunta:  number;
    esOtro:        boolean;
    respuestaOTRA: RespuestaOTRA;
    valorOtra:     null | string;
    respuestaSiNO: boolean | null;
}

export enum RespuestaOTRA {
    Empty = "",
    Pesca = "pesca",
}

