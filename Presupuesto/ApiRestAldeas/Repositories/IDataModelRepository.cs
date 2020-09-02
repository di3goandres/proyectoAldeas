using System;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
using ApiRestAldeasPresupuesto.EntityFrame;
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


        dynamic AgregarCecoPrograma(CecoUpdateRequest request);


        #endregion

        #region RUBROS / CATEGORIA
        dynamic ConsultarCategorias();

        dynamic ConsultarCategoriasPucs();

        dynamic ActualizarCategoria(CategoriUpdateRequest request);
        dynamic ActualizarPuc(PucRequestUpdate request);

        dynamic CrearCategoria(CategoriaRequest request);


        dynamic AgregarPucACategoria(PucRequestUpdate request);

        #endregion

        #region presupuesto
        dynamic PresupuestoObtenerPogramasCecos(long request);

        dynamic ConsultarDetallePresupuestoPrograma(PresupuestoProgramRequest request);

        dynamic ConsultarListaPresupuestoByProgram(PresupuestoProgramRequest request);


        dynamic GuardarPresupuestoDetalle(DbPresupuestoPrograma request);
        #endregion



    }
}
