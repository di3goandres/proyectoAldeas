using System;
namespace ApiRestAldeas.EntityFrame
{
    public class TbColaborador
    {
        public long Id { get; set; }
        public long idProyecto { get; set; }

        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Cargo { get; set; }
        public string Tiempo { get; set; }
        public string TipoContrato { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public long CostoMensual { get; set; }
       
        public int Porcentaje { get; set; }
        public long Contrapartida { get; set; }
        public long Aporte { get; set; }
    }
}
