using System;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ApiRestAldeas.Repositories
{
    public interface IDataModelRepository
    {

        /// <summary>
        /// Metodo para consultar todos los proyectos
        /// </summary>
        /// <returns></returns>
        dynamic ConsultarProgramas();


        dynamic EsAdministrador(string user);


        dynamic GuardarPrograma(ProgramasRequest programasRequest);
        dynamic ActualizarPrograma(ProgramaUpdateRequest programasRequest);





    }
}
