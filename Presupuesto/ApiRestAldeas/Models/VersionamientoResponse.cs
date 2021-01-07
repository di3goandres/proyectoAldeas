using System;
using System.Collections.Generic;
using ApiRestAldeasPresupuesto.EntityFrame;

namespace ApiRestAldeasPresupuesto.Models
{
    public class VersionamientoResponse
    {

        public VersionamientoResponse()
        {
            this.Versiones = new List<PresupuestoAnioData>();
        }
        public PresupuestoAnioData Actual { get; set; }
        public List<PresupuestoAnioData> Versiones { get; set; }

    }

    public class VersionamientoAnioResponse
    {

        public VersionamientoAnioResponse()
        {
            this.Anios = new List<int>();
        }
     
        public List<int> Anios { get; set; }

    }
}
