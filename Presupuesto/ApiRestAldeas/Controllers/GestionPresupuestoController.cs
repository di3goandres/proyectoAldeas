﻿using System;
using ApiRestAldeasPresupuesto.Models;
using ApiRestAldeasPresupuesto.Repositories.GestionPresupuesto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeasPresupuesto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestionPresupuestoController
    {

        #region propiedades

        private readonly IDataGestionPresupuesto _dataRepository;
       
        #endregion

        private readonly ILogger<GestionPresupuestoController> _logger;

        public GestionPresupuestoController(IDataGestionPresupuesto data, ILogger<GestionPresupuestoController> logger)
        {
            _logger = logger;
            _dataRepository = data;
        }


        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/gestion/presupuesto/consultar/coberturas")]
        public dynamic Consultar(CoberturaRequest request)
        {
         
            return _dataRepository.ConsultarPresupuestosByProgramYCeco(request);
        }

    
        [AuthorizeUser]
        [HttpPost]
        [Route("/api/aldeas/gestion/presupuesto/versionar/")]
        public dynamic Versionar(PresupuestoProgramRequest request)
        {

            return _dataRepository.GenerarVersionamiento(request);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("/api/aldeas/gestion/presupuesto/versionar/programas/")]
        public dynamic ConsultarProgramas()
        {

            return _dataRepository.ConsultaProgramasVersion();
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("/api/aldeas/gestion/presupuesto/versiones/presupuesto/{idPrograma}/{anio}")]
        public dynamic ConsultarVersiones(long idPrograma, int anio)
        {

            return _dataRepository.ConsultaVersionesProgramasVersion(idPrograma,anio);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("/api/aldeas/gestion/presupuesto/versiones/programa/anio/{idPrograma}")]
        public dynamic ConsultarVersionesAnio( long idPrograma)
        {
            return _dataRepository.ConsultarAnios(idPrograma);
        }

        [AuthorizeUser]
        [HttpGet]
        [Route("/api/aldeas/gestion/presupuesto/versiones/programa/volver/{idVersionAnterior}/{idActual}")]
        public dynamic ConsultarVersionesAnio(long idVersionAnterior, long idActual)
        {
            return _dataRepository.VolverVersionAnterior(idVersionAnterior, idActual);
        }
    }
}
