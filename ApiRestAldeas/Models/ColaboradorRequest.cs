using System;
namespace ApiRestAldeas.Models
{
    public class ColaboradorRequest
    {
        public string Nombre { get; set; }
        public DateTime Fecha { get; set; }
        public string Cargo { get; set; }
        public string Tiempo { get; set; }
        public string TipoContrato { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public long CostoMensual { get; set; }
        public int CentroCostos { get; set; }
        public int Subcentro { get; set; }
        public int Porcentaje { get; set; }
        public long Contrapartida { get; set; }
        public long Aporte { get; set; }
    }
}
