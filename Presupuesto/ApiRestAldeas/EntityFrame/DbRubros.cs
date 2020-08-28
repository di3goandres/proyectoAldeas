using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbRubros
    {
        [Key]
        public long id { get; set; }

        public string Nombre { get; set; }
        public bool EsPptp { get; set; }
        public bool esNomina { get; set; }


        public bool Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }


    }
}
