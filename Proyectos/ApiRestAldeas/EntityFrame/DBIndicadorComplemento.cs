using System;
namespace ApiRestAldeas.EntityFrame
{
    public class DBIndicadorComplemento
    {
        public long id { get; set; }
        public long idPregunta { get; set; }
        public string opcion { get; set; }
        public bool esOtro { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaActualizacion { get; set; }
    }
}
