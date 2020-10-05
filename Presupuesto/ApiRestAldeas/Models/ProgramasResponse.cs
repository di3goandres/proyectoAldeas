using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{
    public class Program
    {
        [Key]

        public long Id { get; set; }

        public string Nombre { get; set; }

        public int IdTipoPrograma { get; set; }

        public string TipoProgramaNombre { get; set; }

        public bool Cobertura { get; set; }


        public decimal PerNomina { get; set; }

        public decimal PerCapacitacion { get; set; }


        public bool Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }


    }

    public class ProgramCeco
    {
        [Key]
        public long Id { get; set; }

        public long IdPrograma { get; set; }

        public int IdFinanciador { get; set; }
        public string NombreFinanciador { get; set; }



        public int CodigoCeco { get; set; }


        public string Nombre { get; set; }


        public int SubCentro { get; set; }

        public string NombreSubCentro { get; set; }

        public string FacilityNav { get; set; }


        public bool Estado { get; set; }
    }
    public class ProgramasResponse
    {
        public List<ProgramCeco> Cecos { get; set; }
        public List<Program> Programas { get; set; }

    }

    public class FinanciadoresResponse
    {
        public List<FinanciadorData> financiadoresData { get; set; }
       

    }
}
