using System;
using System.Collections.Generic;
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

        dynamic ConsultarSoloProgramas(long id);

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


        dynamic GuardarPresupuesto(DbPresupuesto request);

        dynamic ActualizarPresupuesto(DbPresupuesto request);

        dynamic ObtenerPucByRubro(long request);

        dynamic ActualizarPresupuesto(DbPresupuestoPrograma request);
        #endregion



        #region USUARIO
        dynamic AgregarUsuario(DBAdministrador usuario);


        dynamic ListaUsuarios();

        dynamic ListaProgramasUsuarios(long idUsuario);

        dynamic AsociarProgramasUsuarios(List<UsuarioProgramaRequest> request);

        dynamic QuitarProgramasUsuarios(List<UsuarioProgramaRequest> request);


        #endregion


        #region "TIPOS DE PROGRAMA"
        dynamic ConsultarTiposPrograma();

        #endregion


        #region "Cargos"
        dynamic ConsultarCargos();

        dynamic GuardarCargos( CargosRequest data);

        dynamic ActualizarCargos(CargosRequest data);



        #endregion


    }
}
