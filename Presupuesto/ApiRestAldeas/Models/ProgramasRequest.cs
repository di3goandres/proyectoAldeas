using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class ProgramasRequest
    {
        public string Nombre { get; set; }
        public List<ProgramCeco> Cecos { get; set; }
    }
    public class ProgramaUpdateRequest
    {
        public long Id { get; set; }

        public string Nombre { get; set; }

        public bool Estado { get; set; }

        public decimal perNomina { get; set; }

        public decimal perCapacitacion { get; set; }
    }

    public class CecoUpdateRequest
    {

        public long Id { get; set; }

        public long IdPrograma { get; set; }

        public int CodigoCeco { get; set; }

        public string Nombre { get; set; }
        public int SubCentro { get; set; }


        public string NombreSubCentro { get; set; }

        public string FacilityNav { get; set; }

        public bool Estado { get; set; }

    }
}
