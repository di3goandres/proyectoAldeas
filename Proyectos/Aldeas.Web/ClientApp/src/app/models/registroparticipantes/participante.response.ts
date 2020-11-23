// Generated by https://quicktype.io

import { RegistroParticipantes } from "./registro.participantes.response";

export interface DetalleParticipanteResponse {
    participante:       RegistroParticipantes;
    preguntas:          Pregunta[];
    integrantesFamilia: IntegrantesFamilia[];
}

export interface IntegrantesFamilia {
    id:               number;
    id_participantes: number;
    nombre:           string;
    rango_0_5:        number;
    rango_6_12:       number;
    rango_13_17:      number;
    rango_18_24:      number;
    rango_25_56:      number;
    mayores_60:       number;
    total:            number;
    totalDesagregado: number;
    porcentaje:       number;
}



export interface Pregunta {
    id:             number;
    idParticipante: number;
    pregunta:       string;
    valor:          string;
    esOtro:         boolean;
}
