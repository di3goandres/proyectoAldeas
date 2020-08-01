using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
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

        public dynamic DatosColombia()
        {
            return MunicipioOperations.obtenerDatos(_factory, _connectionDB);

        }

        public dynamic GuardarProyecto()
        {
           return ProyectoOperations.ConsultarProyecto(_factory, _connectionDB) ;
        }

      
    }


}
