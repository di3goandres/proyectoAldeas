using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.Helper;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Repositories
{
    public class DataModelPresupuesto : IDataModelPresupuesto
    {
        private readonly IOptions<ConnectionDB> _connectionDB;

        private readonly IContextFactory _factory;

        public DataModelPresupuesto(IOptions<ConnectionDB> connectionDB, IContextFactory factory)
        {
            _connectionDB = connectionDB;
            _factory = factory;
        }

        public dynamic Consultar(long id)
        {
            return PresupuestoAnioOperations.Consultar( _factory, _connectionDB, id);
        }

        public dynamic ConsultarFinanciadorFaltante(long id)
        {
            return PresupuestoAnioOperations.ConsultarFinanciadorFaltante(_factory, _connectionDB, id);
        }

        public dynamic ConsultarPresupuestoAnio(long id)
        {
            return PresupuestoAnioOperations.ConsultarPresupuestoAnio(_factory, _connectionDB, id);

        }

        public dynamic GenerarInforme(PresupuestoProgramRequest request)
        {
            return InformesOperations.GenerarInforme(_factory, _connectionDB, request);
        }

        public dynamic Guardar(PresupuestoAnioData request)
        { 
            return PresupuestoAnioOperations.Guardar( _factory, _connectionDB, request);
         
        }
    }
}
