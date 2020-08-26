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

    }
}
