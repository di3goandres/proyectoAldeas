using System;
using ApiRestAldeas.EntityFrame;

using System.Collections.Generic;

namespace ApiRestAldeas.Models
{

    public class IndicadorPResponse
    {
        public long id { get; set; }
        public string Indicador { get; set; }
    }
    public class ParticipanteRespuestasIndicadores
    {
        public long idRespuesta { get; set; }
        public long idPregunta { get; set; }
        public long? idComplemento { get; set; }
        public long idIndicador { get; set; }
        public string Indicador { get; set; }
        public string Pregunta { get; set; }
        public int TipoPregunta { get; set; }
        public bool? esOtro { get; set; }
        public string RespuestaOTRA { get; set; }
        public string valorOtra { get; set; }
        public bool? RespuestaSiNO { get; set; }
    }

    public class ResponseRespuestasParticipante
    {
        public ResponseRespuestasParticipante()
        {
            this.RespuestasIndicadoresParticipante = new List<ParticipanteRespuestasIndicadores>();
            this.Indicador = new List<IndicadorPResponse>();
        }

        public List<IndicadorPResponse> Indicador { get; set; }
        public List<ParticipanteRespuestasIndicadores> RespuestasIndicadoresParticipante { get; set; }
    }

    public class ResponseIndicadoresParticiante
    {
        public ResponseIndicadoresParticiante()
        {
            this.IndicadoresParticipante = new List<DBIndicadores>();
        }
       public  List<DBIndicadores> IndicadoresParticipante { get; set; }
    }
}
