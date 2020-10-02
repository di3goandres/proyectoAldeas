using ApiRestAldeasPresupuesto.EntityFrame;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{

    public class ResponsePrograma
    {
       
        public long id { get; set; }

        public string Nombre { get; set; }
        public Boolean Cobertura { get; set; }

        public decimal per_nomina { get; set; }

        public decimal per_capacitacion { get; set; }

        public bool Estado { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }



    }
    public class ResponsePresupuesto
    {

     
        public long id { get; set; }
        public long idPrograma { get; set; }

        public string NombrePrograma { get; set; }


        public string Financiador { get; set; }

        public int CodigoCeco { get; set; }

        public string NombreCodigoCeco { get; set; }

        public int SubCeco { get; set; }

        public string NombreSubCeco { get; set; }




        public int Anio { get; set; }
        public Decimal CoberturaAnual { get; set; }
        public Decimal CoberturaMensual { get; set; }
        public Decimal CoberturaMensualEsperada { get; set; }
        public Decimal CoberturasCasas { get; set; }



    }
    public class PresupuestoProgramRequest
    {
        public long IdPresupuesto { get; set; }

    }
    public class PresupuestoProgramResponse
    {
        public long id { get; set; }

        public long idPresupuesto { get; set; }


        public string Programa { get; set; }

        public int Anio { get; set; }

        public int CentroCosto { get; set; }

        public int SubCentroCosto { get; set; }

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
    public class Presupuestodetalle
    {

        public List<PresupuestoProgramResponse> DetallePresupuesto { get; set; }
    }

    public class PresupuestoByProgramResponse
    {

        public Program programa { get; set; }
        public List<ResponsePresupuesto> presupuesto { get; set; }
    }

    public class AnioPresupuestoPrograma
    {
        public long Id { get; set; }

        public long Anio { get; set; }

    }
}
