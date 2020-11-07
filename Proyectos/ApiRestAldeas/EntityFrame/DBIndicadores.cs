using System;
namespace ApiRestAldeas.EntityFrame
{
    public class DBIndicadores
    {
        public long id { get; set; }
        public string NombreIndicador { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaActualizacion { get; set; }

    }
}
