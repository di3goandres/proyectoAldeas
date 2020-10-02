using System;
using System.Collections.Generic;
using System.IO;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Models;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Helper;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Repositories
{
    public class DataModelRepository : IDataModelRepository
    {
        private readonly IOptions<ConnectionDB> _connectionDB;

        private readonly IContextFactory _factory;

        public DataModelRepository(IOptions<ConnectionDB> connectionDB, IContextFactory factory)
        {
            _connectionDB = connectionDB;
            _factory = factory;
        }

        #region programas
        public dynamic ActualizarCeco(CecoUpdateRequest request)
        {
            return ProgramasOperations.ActualizarCeco(_factory, _connectionDB, request);
        }

        public dynamic ActualizarPrograma(ProgramaUpdateRequest programasRequest)
        {
            return ProgramasOperations.ActualizarPrograma(_factory, _connectionDB, programasRequest);
        }

        public dynamic ConsultarProgramas()
        {
            return ProgramasOperations.ConsultarProgramas(_factory, _connectionDB);
        }

        public dynamic ConsultarSoloProgramas(long id)
        {
            return ProgramasOperations.ConsultarSoloProgramas(_factory, _connectionDB, id);
        }

        public dynamic ConsultarTokenProgramas(long id)
        {
            return ProgramasOperations.ConsultarTokenProgramas(_factory, _connectionDB, id);
        }
        public dynamic EsAdministrador(string user)
        {
            return UserOperations.EsAdministrador(_factory, _connectionDB, user);
        }

        public dynamic ObtenerID(string user)
        {
            return UserOperations.ObtenerID(_factory, _connectionDB, user);
        }
        public dynamic GuardarPrograma(ProgramasRequest programasRequest)
        {
            return ProgramasOperations.GuardarProgramas(_factory, _connectionDB, programasRequest);
        }

        public dynamic AgregarCecoPrograma(CecoUpdateRequest request)
        {
            return ProgramasOperations.AgregarCecoAPrograma(_factory, _connectionDB, request);
        }
        #endregion
        #region categorias

        public dynamic ConsultarCategorias()
        {
            return CategoriaOperations.ConsultarCategorias(_factory, _connectionDB);
        }

        public dynamic ConsultarCategoriasPucs()
        {
            return CategoriaOperations.ConsultarCategoriasPucs(_factory, _connectionDB);
        }

        public dynamic ActualizarCategoria(CategoriUpdateRequest request)
        {
            return CategoriaOperations.ActualizarCategoria(_factory, _connectionDB, request);
        }

        public dynamic ActualizarPuc(PucRequestUpdate request)
        {
            return CategoriaOperations.ActualizarPuc(_factory, _connectionDB, request);
        }

        public dynamic CrearCategoria(CategoriaRequest request)
        {
            return CategoriaOperations.CrearCategoria(_factory, _connectionDB, request);
        }

        public dynamic AgregarPucACategoria(PucRequestUpdate request)
        {
            return CategoriaOperations.AgregarPucACategoria(_factory, _connectionDB, request);
        }




        #endregion

        #region PRESUPUESTO
        public dynamic PresupuestoObtenerPogramasCecos(long id)
        {
            return PresupuestoOperations.ConsultarProgramas(_factory, _connectionDB, id);
        }

        public dynamic ConsultarDetallePresupuestoPrograma(PresupuestoProgramRequest request)
        {
            return PresupuestoOperations.ConsultarDetallePresupuestosByProgramas(_factory, _connectionDB, request);
        }

        public dynamic ConsultarListaPresupuestoByProgram(PresupuestoProgramRequest request)
        {
            return PresupuestoOperations.ConsultarPresupuestosByProgram(_factory, _connectionDB, request);
        }

        public dynamic GuardarPresupuestoDetalle(DbPresupuestoPrograma request)
        {
            return PresupuestoOperations.GuardarDetallePresupuesto(_factory, _connectionDB, request);
        }

        public dynamic GuardarPresupuesto(DbPresupuesto request)
        {
            return PresupuestoOperations.GuardarPresupuesto(_factory, _connectionDB, request);
        }

        public dynamic ActualizarPresupuesto(DbPresupuesto request)
        {
            return PresupuestoOperations.ActualizarPresupuesto(_factory, _connectionDB, request);
        }

        public dynamic ObtenerPucByRubro(long request)
        {
            return PresupuestoOperations.ConsultarPucsByRubro(_factory, _connectionDB, request);
        }

        public dynamic ActualizarPresupuesto(DbPresupuestoPrograma request)
        {
            return PresupuestoOperations.ActualizarPresupuestoProgramas(_factory, _connectionDB, request);
        }




        #endregion


        #region USUARIOS
        public dynamic AgregarUsuario(DBAdministrador usuario)
        {
            return UserOperations.AgregarUsuario(_factory, _connectionDB, usuario);
        }

        public dynamic ListaUsuarios()
        {
            return UserOperations.ListaUsuarios(_factory, _connectionDB);
        }

        public dynamic ListaProgramasUsuarios(long idUsuario)
        {
            return UserOperations.ListaProgramasUsuarios(_factory, _connectionDB, idUsuario);
        }

        public dynamic AsociarProgramasUsuarios(List<UsuarioProgramaRequest> request)
        {
            return UserOperations.AsociarProgramasUsuarios(_factory, _connectionDB, request);
        }

        public dynamic QuitarProgramasUsuarios(List<UsuarioProgramaRequest> request)
        {
            return UserOperations.QuitarProgramasUsuarios(_factory, _connectionDB, request);
        }



        #endregion

        #region tiposProgramas
        public dynamic ConsultarTiposPrograma()
        {
            return TipoProgramaOperations.ConsultarTipoProgramas(_factory, _connectionDB);
        }


        #endregion

        #region "Cargos"
        public dynamic ConsultarCargos()
        {
            return CargosOperations.ConsultarCargos(_factory, _connectionDB);
        }

        public dynamic GuardarCargos(CargosRequest data)
        {
            return CargosOperations.GuardarCargos(_factory, _connectionDB, data);
        }

        public dynamic ActualizarCargos(CargosRequest data)
        {
            return CargosOperations.ActualizarCargo(_factory, _connectionDB, data);
        }



        #endregion

        #region FINANCIADORES
        public dynamic ConsultarFinanciadores()
        {
            return FinanciadoresOperations.ConsultarFinanciadores(_factory, _connectionDB);
        }

      

        #endregion
    }


}
