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
        #region PROGRAMAS

        /// <summary>
        /// Metodo para consultar todos los proyectos
        /// </summary>
        /// <returns></returns>
        dynamic ConsultarProgramas();


        dynamic EsAdministrador(string user);


        dynamic GuardarPrograma(ProgramasRequest programasRequest);
        dynamic ActualizarPrograma(ProgramaUpdateRequest programasRequest);

        dynamic ActualizarCeco(CecoUpdateRequest request);

        #endregion

        #region RUBROS / CATEGORIA
        dynamic ConsultarCategorias();

        dynamic ConsultarCategoriasPucs();

        dynamic ActualizarCategoria(CategoriUpdateRequest request);



        #endregion





    }
}
