using System;
using System.IO;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Models;
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

        public dynamic EsAdministrador(string user)
        {
            return UserOperations.EsAdministrador(_factory, _connectionDB, user);
        }

        public dynamic GuardarPrograma(ProgramasRequest programasRequest)
        {
            return ProgramasOperations.GuardarProgramas(_factory, _connectionDB, programasRequest);
        }


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
        #endregion
    }


}
