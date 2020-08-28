using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class Categoria
    {
        public long Id { get; set; }

        public string Nombre { get; set; }

        public bool Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }
    }
    public class CategoriaPuc
    {
        public long Id { get; set; }
        public long IdCategoria { get; set; }
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
    public class CategoriaResponse
    {
        public List<Categoria> Categorias { get; set; }
        public List<CategoriaPuc> Pucs { get; set; }

    }
}
