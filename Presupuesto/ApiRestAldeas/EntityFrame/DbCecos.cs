using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbCecos
    {

        [Key]
        public long id { get; set; }

        public long idPrograma { get; set; }

        public int CodigoCeco { get; set; }


        public string Nombre { get; set; }


        public int SubCentro { get; set; }

        public string NombreSubCentro { get; set; }

        public string FacilityNav { get; set; }


        public bool Estado { get; set; }

    }
}
