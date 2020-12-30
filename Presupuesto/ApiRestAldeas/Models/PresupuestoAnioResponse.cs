using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class PresupuestoAnioData
    {
        public long id { get; set; }

        public long idPrograma { get; set; }
        public string NombrePrograma { get; set; }

        public string TipoPrograma { get; set; }
        public bool Cobertura { get; set; }


        public int Anio { get; set; }

        public Boolean actual { get; set; }

        public int numeroVersion { get; set; }

        public decimal per_nomina { get; set; }

        public decimal per_capacitacion { get; set; }


        public DateTime fecha_creacion { get; set; }

        public DateTime fecha_actualizacion { get; set; }
    }


    public class PresupuestoAnioResponse
    {
        public List<PresupuestoAnioData> presupuestoAnioData { get; set; }
        public long idPrograma { get; set; }
        public string NombrePrograma { get; set; }
    
    }

}
