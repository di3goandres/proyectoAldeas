using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeasPresupuesto.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeasPresupuesto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresupuestoAnioController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelPresupuesto _dataModelRepository;

        #endregion

        private readonly ILogger<PresupuestoAnioController> _logger;

        public PresupuestoAnioController(IDataModelPresupuesto dataModelRepository, ILogger<PresupuestoAnioController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        //[Authorize]
        [HttpGet]
        [Route("/api/presupuestoanio/consultar/{id}")]
        public dynamic Consultar(long id)
        {
            return _dataModelRepository.Consultar(id);
        }
    }
}