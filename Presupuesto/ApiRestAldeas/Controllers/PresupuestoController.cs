using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Repositories;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeasPresupuesto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresupuestoController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

        private readonly ILogger<PresupuestoController> _logger;

        public PresupuestoController(IDataModelRepository dataModelRepository, ILogger<PresupuestoController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        #region PResupuesto

        //[Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getinfodata/{id}")]
        public dynamic ConsultarDatos(long id)
        {
            return _dataModelRepository.PresupuestoObtenerPogramasCecos(id);
        }


        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getdetalle/{id}")]
        public dynamic ConsultarDetallePresupuestoPrograma(long id)
        {
            PresupuestoProgramRequest request = new PresupuestoProgramRequest();
            request.IdPresupuesto = id;
            return _dataModelRepository.ConsultarDetallePresupuestoPrograma(request);
        }
        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/getlistpresupuestobyProgram/")]
        public dynamic ConsultarPresupuestoPrograma(PresupuestoProgramRequest request)
        {
            return _dataModelRepository.ConsultarListaPresupuestoByProgram(request);
        }

        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getlistpuc/{id}")]
        public dynamic ActualizarPresupuesto(long id)
        {
            return _dataModelRepository.ObtenerPucByRubro(id);
        }
        [Authorize]

        [HttpPost]
        [Route("/api/presupuesto/storedetalle/")]
        public dynamic GuardarDetallePresupuesto(DbPresupuestoPrograma request)
        {

            return _dataModelRepository.GuardarPresupuestoDetalle(request);
        }

        [Authorize]

        [HttpPost]
        [Route("/api/presupuesto/updatedetalle/")]
        public dynamic UpdateDetallePresupuesto(DbPresupuestoPrograma request)
        {

            return _dataModelRepository.ActualizarPresupuesto(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/store/")]
        public dynamic GuardarPresupuesto(DbPresupuesto request)
        {
            return _dataModelRepository.GuardarPresupuesto(request);
        }
        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/update/")]
        public dynamic ActualizarPresupuesto(DbPresupuesto request)
        {
            return _dataModelRepository.ActualizarPresupuesto(request);
        }


        #endregion


    }
}