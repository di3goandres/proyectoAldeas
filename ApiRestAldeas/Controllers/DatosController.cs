using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{


    [ApiController]
    [Route("[controller]")]
    public class DatosController : ControllerBase
    {

        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

                        private readonly ILogger<DatosController> _logger;

        public DatosController(IDataModelRepository dataModelRepository, ILogger<DatosController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        

        //[Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosColombia/")]
        public dynamic consultar()
        {
            return _dataModelRepository.DatosColombia();
        }


    }
}
