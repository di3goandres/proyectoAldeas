using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbPresupuestoAnio
    {
        public long id { get; set; }

        public long idPrograma { get; set; }

        public int Anio { get; set; }

        public Boolean actual { get; set; }

        public int numeroVersion { get; set; }

        public decimal per_nomina { get; set; }

        public decimal per_capacitacion { get; set; }

        public DateTime fecha_creacion { get; set; }

        public DateTime fecha_actualizacion { get; set; }

    }
}
