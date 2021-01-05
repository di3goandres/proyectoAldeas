using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeasPresupuesto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProgramaController : ControllerBase
    {

        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

        private readonly ILogger<TipoProgramaController> _logger;

        public TipoProgramaController(IDataModelRepository dataModelRepository, ILogger<TipoProgramaController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("/api/tipoprograma/get")]
        public dynamic consultar()
        {
            return _dataModelRepository.ConsultarTiposPrograma();
        }

    }
}