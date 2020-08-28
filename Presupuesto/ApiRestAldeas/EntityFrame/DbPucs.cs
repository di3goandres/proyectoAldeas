using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbPucs
    {
        [Key]
        public long id { get; set; }
        public long idRubro { get; set; }
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
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
    }
}
