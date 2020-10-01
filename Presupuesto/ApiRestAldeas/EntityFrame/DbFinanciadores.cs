using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbFinanciadores
    {

        public int id { get; set; }

        public string nombre { get; set; }

        public Boolean activo { get; set; }

        public DateTime fecha_creacion { get; set; }

        public DateTime fecha_actualizacion { get; set; }

    }
}
