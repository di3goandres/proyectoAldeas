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



        /// <summary>
        /// retorna todos los financiadores.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        dynamic ConsultarPresupuestoAnio(long id);

        dynamic ConsultarFinanciadorFaltante(long id);



    }
}
