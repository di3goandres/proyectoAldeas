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
    public class FinanciadoresController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

        private readonly ILogger<FinanciadoresController> _logger;

        public FinanciadoresController(IDataModelRepository dataModelRepository, ILogger<FinanciadoresController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }
        [Authorize]
        [HttpGet]
        [Route("/api/financiadores/get/")]
        public dynamic consultar()
        {
            return _dataModelRepository.ConsultarFinanciadores();
        }
    }
}