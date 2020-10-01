using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Repositories;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeasPresupuesto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargosController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

        private readonly ILogger<CargosController> _logger;

        public CargosController(IDataModelRepository dataModelRepository, ILogger<CargosController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }


        [Authorize]
        [HttpGet]
        [Route("/api/cargos/get/")]
        public dynamic consultar()
        {
            return _dataModelRepository.ConsultarCargos();
        }

        [Authorize]
        [HttpPost]
        [Route("/api/cargos/save/")]
        public dynamic Guardar(CargosRequest data)
        {
            return _dataModelRepository.GuardarCargos(data);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/cargos/update/")]
        public dynamic Update(CargosRequest data)
        {
            return _dataModelRepository.ActualizarCargos(data);
        }
    }
}