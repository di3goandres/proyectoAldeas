using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Models
{

    public class ProgramPresupuesto
    {
    
        public long Id { get; set; }

        public string Nombre { get; set; }


    }

    public class PresupuestoProgramCeco
    {
      
      

        public long IdPrograma { get; set; }

        public int CodigoCeco { get; set; }


        public string Nombre { get; set; }


    }

    public class PresupuestoSubCeco
    {
        public long Id { get; set; }

        public long IdCeco { get; set; }


        public int SubCentro { get; set; }

        public string NombreSubCentro { get; set; }

        public string FacilityNav { get; set; }


      
    }
   

    public class PresupuestoRubros
    {
        public long Id { get; set; }

        public long IdCeco { get; set; }

        public int SubCentro { get; set; }

        public string NombreSubCentro { get; set; }

        public string FacilityNav { get; set; }



    }

    public class PresupuestoCategoria
    {
        public long Id { get; set; }

        public string Nombre { get; set; }
        public bool Esppto { get; set; }
        public bool EsNomina { get; set; }


    }

    public class PresupuestoCategoriaPuc
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
        public int? Casa { get; set; }
        public bool RequiereNotaIngles { get; set; }

    }



    public class PresupuestoResponse
    {
        public List<PresupuestoProgramCeco> Cecos { get; set; }

        public List<PresupuestoSubCeco> PresupuestoSubCeco { get; set; }

        public List<ProgramPresupuesto> Programas { get; set; }

        public List<PresupuestoCategoria> Categorias { get; set; }

        public List<PresupuestoCategoriaPuc> Pucs { get; set; }

    }
}
