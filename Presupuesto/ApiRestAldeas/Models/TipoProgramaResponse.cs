using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class TipoProgramaResponseData
    {

        public int id { get; set; }
        public string nombre { get; set; }
        public bool cobertura { get; set; }
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
    }
    public class TipoProgramaResponse
    {

        public List<TipoProgramaResponseData> Data { get; set; }

    }
}
