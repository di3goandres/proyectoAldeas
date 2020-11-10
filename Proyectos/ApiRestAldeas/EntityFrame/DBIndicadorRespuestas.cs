using System;
namespace ApiRestAldeas.EntityFrame
{
    public class DBIndicadorRespuestas
    {
        public long id { get; set; }
        public long idProyecto { get; set; }
        public long idRegistroParticipante { get; set; }
        public long idIndicadorPregunta { get; set; }
        public long? idComplemento { get; set; }


        public Boolean? respuestaSi_No { get; set; }
        public Boolean? esOtro { get; set; }
        public string Respuesta { get; set; }
     
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaActualizacion { get; set; }

    }
}
