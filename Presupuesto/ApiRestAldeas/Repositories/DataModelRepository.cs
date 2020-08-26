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
    
    }   


}
