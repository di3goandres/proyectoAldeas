using ApiRestAldeasPresupuesto.EntityFrame;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class CargosResponse
    {
        public List<DbCargos> CargosData { get; set; }
    }

    public class CargosRequest
    {
        public long id { get; set; }

        public string tipo { get; set; }

        public string cod_cargo { get; set; }

        public string cargo { get; set; }
    }
}
