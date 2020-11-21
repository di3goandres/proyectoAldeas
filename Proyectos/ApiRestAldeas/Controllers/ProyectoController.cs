using System;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProyectoController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;
        private readonly ILogger<ProyectoController> _logger;
        #endregion

        public ProyectoController(IDataModelRepository dataModelRepository, ILogger<ProyectoController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/proyectos/obtenerProyectos")]
        public dynamic ConsultaProyectos()
        {
            return _dataModelRepository.ConsultarListaProyectos();
        }

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/proyectos/obtenerProyectosById/{id}")]
        public dynamic ConsultaProyectosById(long id)
        {
            return _dataModelRepository.ConsultarProyectosByID(id);
        }
        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/proyectos/obtenerCecosProyectosById/{id}")]
        public dynamic ConsultaCecosProyectosById(long id)
        {
            return _dataModelRepository.ConsultarCecosProyectosByID(id);
        }

    }
}
