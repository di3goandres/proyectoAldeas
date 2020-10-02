using ApiRestAldeasPresupuesto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.Repositories
{
    public interface IDataModelPresupuesto
    {
        dynamic Consultar(long id);

        dynamic Guardar(PresupuestoAnioData request);


    }
}
