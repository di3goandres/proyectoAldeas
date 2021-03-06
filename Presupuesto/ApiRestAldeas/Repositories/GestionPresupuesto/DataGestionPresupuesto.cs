﻿using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Helper;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Repositories.GestionPresupuesto
{
    public class DataGestionPresupuesto : IDataGestionPresupuesto
    {
        private readonly IOptions<ConnectionDB> _connectionDB;

        private readonly IContextFactory _factory;

        public DataGestionPresupuesto(IOptions<ConnectionDB> connectionDB, IContextFactory factory)
        {
            _connectionDB = connectionDB;
            _factory = factory;
        }

        public dynamic ConsultaProgramasVersion()
        {
            return ProgramasOperations.ConsultarOnlyProgramas(_factory, _connectionDB);
        }

        public dynamic ConsultarAnios(long idPrograma)
        {
            return GestionPresupuestoOperations.ConsultarAnios(_factory, _connectionDB, idPrograma);

        }

        public dynamic ConsultarPresupuestosByProgramYCeco(CoberturaRequest request)
        {
            return GestionPresupuestoOperations.ConsultarPresupuestosByProgramYCeco(_factory, _connectionDB, request);
        }

        public dynamic ConsultaVersionesProgramasVersion(long idPrograma, int Anio)
        {
            return GestionPresupuestoOperations.ConsulatPresupuestoAniosPrograma(_factory, _connectionDB, idPrograma, Anio);
        }

        public dynamic GenerarVersionamiento(PresupuestoProgramRequest request)
        {
            return GestionPresupuestoOperations.GenerarVersionamiento(_factory, _connectionDB, request);
        }

        public dynamic VolverVersionAnterior(long idVersionAnterior, long idActual)
        {
            return GestionPresupuestoOperations.VolverVersionAnterior(_factory, _connectionDB, idVersionAnterior, idActual);
        }
    }
}
