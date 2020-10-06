using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbPresupuestoPrograma
    {

        [Key]
        public long id { get; set; }
        public long idPresupuesto { get; set; }
        public long idProgramaCecos { get; set; }
        public long idRubroPucs { get; set; }
        public bool esNomina { get; set; }
        public bool esPPTO { get; set; }
        public long? NumeroIdentificacion { get; set; }
        public string Nombre { get; set; }
        public int? Cargo { get; set; }
        public int? Asignacion { get; set; }
        public int? NoCasa { get; set; }
        public int? NoKids { get; set; }
        public string NotaIngles { get; set; }
        public string DetalleGasto { get; set; }
        public decimal Enero { get; set; }
        public decimal Febrero { get; set; }
        public decimal Marzo { get; set; }
        public decimal Abril { get; set; }
        public decimal Mayo { get; set; }
        public decimal Junio { get; set; }
        public decimal Julio { get; set; }
        public decimal Agosto { get; set; }
        public decimal Septiembre { get; set; }
        public decimal Octubre { get; set; }
        public decimal Noviembre { get; set; }
        public decimal Diciembre { get; set; }
    }
}
