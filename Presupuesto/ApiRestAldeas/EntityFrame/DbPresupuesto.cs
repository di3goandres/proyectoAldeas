using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbPresupuesto
    {

        [Key]
        public long id { get; set; }
        public long idPresupuestoAnio { get; set; }
        public long idPrograma { get; set; }
        public long idFinanciador { get; set; }
        public long IdProgramaCecos { get; set; }
        public string NombreContrato { get; set; }

        public int Anio { get; set; }
        public Decimal CoberturaAnual { get; set; }
        public Decimal CoberturaMensual { get; set; }
        public Decimal CoberturaMensualEsperada { get; set; }
        public Decimal CoberturasCasas { get; set; }

        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }

    }

    public class View_DbPresupuesto
    {

        public long id { get; set; }

        public long idPresupuesto { get; set; }

        public string ClasificacionGasto { get; set; }

        public string Programa { get; set; }

        public int Anio { get; set; }

        public int CentroCosto { get; set; }
        public string NombreCentroCosto { get; set; }


        public int SubCentroCosto { get; set; }
        public string NombreSubCentroCosto { get; set; }


        public string NombreRubro { get; set; }
        public bool esNomina { get; set; }

        public bool EsPptp { get; set; }
        public string Cargo { get; set; }

        public string CuentaSIIGO { get; set; }


        public string NombreCuenta { get; set; }

        public string CuentaCotable { get; set; }


        public string Facility { get; set; }

        public string DetalleGasto { get; set; }

        public string NotaIngles { get; set; }


        public int? NoCasa { get; set; }

        public int? NoKids { get; set; }

        public long? NumeroIdentificacion { get; set; }

        public string Nombre { get; set; }

        public int? Asignacion { get; set; }


        public Decimal Enero { get; set; }
        public Decimal Febrero { get; set; }
        public Decimal Marzo { get; set; }
        public Decimal Abril { get; set; }
        public Decimal Mayo { get; set; }
        public Decimal Junio { get; set; }
        public Decimal Julio { get; set; }
        public Decimal Agosto { get; set; }
        public Decimal Septiembre { get; set; }
        public Decimal Octubre { get; set; }
        public Decimal Noviembre { get; set; }
        public Decimal Diciembre { get; set; }

        public Decimal Total { get; set; }

    }
}
