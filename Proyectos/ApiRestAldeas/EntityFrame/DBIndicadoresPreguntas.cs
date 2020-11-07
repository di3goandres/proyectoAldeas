using System;
using System.Collections.Generic;

namespace ApiRestAldeas.EntityFrame
{
    public class DBIndicadoresPreguntas
    {
        public long id { get; set; }
        public long id_indicador { get; set; }
        public long? id_indicador_pregunta_padre { get; set; }
        public bool esPadre { get; set; }
        public string descripcion { get; set; }
        public int Tipo { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaActualizacion { get; set; }
      
    }
}
