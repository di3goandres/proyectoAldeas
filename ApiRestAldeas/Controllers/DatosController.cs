using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
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

        //[Authorize]
        [HttpPost]
        [Route("/api/aldeas/GuardarProyecto/")]
        public dynamic guardarProyecto([FromBody]ProyectoRequest proyectoRequest)
        {
            return _dataModelRepository.GuardarRegistroProyecto(proyectoRequest);
        }

        [HttpGet]
        [Route("/api/aldeas/datosCentroCostos/")]
        public dynamic ConsultarCentroCostos()
        {
            return _dataModelRepository.CentroCostos();
        }


    }
}
