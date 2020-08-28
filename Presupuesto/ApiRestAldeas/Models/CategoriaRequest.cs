using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class PucRequestUpdate
    {
        public long Id { get; set; }
        public string Tipo { get; set; }
        public string CuentaSIIGO { get; set; }
        public string DescripcionCuenta { get; set; }
        public string CuentaNAV { get; set; }
        public string DetalleCuentaNav { get; set; }
        public string TipoCuentaNav { get; set; }
        public string FichaBanco { get; set; }
        public int Casa { get; set; }
        public bool RequiereNotaIngles { get; set; }
        public bool Estado { get; set; }
    }

    public class CategoriUpdateRequest
    {
        public long Id { get; set; }

        public string Nombre { get; set; }

        public bool Estado { get; set; }

    }
}
