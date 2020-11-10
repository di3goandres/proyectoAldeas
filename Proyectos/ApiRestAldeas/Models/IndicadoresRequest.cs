using System;
using System.Collections.Generic;

namespace ApiRestAldeas.Models
{
    public class IndicadoresRequest
    {
        public long id { get; set; }
        public long idRegistroParticipante { get; set; }
        public long idProyecto { get; set; }
        public List<RespuestaIndicadores> Respuestas { get; set; }

 
    }

    public class RespuestaIndicadores
    {

        public int Tipo { get; set; }
        public long idIndicadorPregunta { get; set; }
        public int? idComplemento { get; set; }
        public Boolean? respuestaSi_No { get; set; }
        public string Respuesta { get; set; }
        public Boolean? esOtro { get; set; }
        public Boolean Valido { get; set; }

    }
}
