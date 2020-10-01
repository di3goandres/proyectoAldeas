using ApiRestAldeasPresupuesto.EntityFrame;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{

    public class FinanciadorData
    {

        public int Id { get; set; }

        public string Nombre { get; set; }

        public Boolean Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }

    }
    public class FinanciadorResponse
    {
        public List<FinanciadorData> FinanciadoresData { get; set; }
    }

}