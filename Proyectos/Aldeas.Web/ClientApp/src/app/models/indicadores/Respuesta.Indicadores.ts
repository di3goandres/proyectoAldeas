

export class IndicadoresRequest{
    id:                     number;
    idRegistroParticipante: number;
    idProyecto:             number;
    Respuestas:             RespuestaIndicadores[];
}

export class RespuestaIndicadores{

    constructor(){
        this.Valido = false;
    }

    Tipo:                   number;
    idIndicadorPregunta:    number;
    idComplemento:          number;
    respuestaSi_No:         boolean;
    Respuesta:              string;
    esOtro:                 boolean;
    Valido:                 boolean;

}