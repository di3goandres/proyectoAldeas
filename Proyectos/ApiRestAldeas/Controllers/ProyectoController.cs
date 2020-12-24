using System;
using System.IO;
using ApiRestAldeas.Models;
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

      //& [Authorize]
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


        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/ejecucion/update/")]
        public dynamic ActualizarEjecucion([FromBody] EjecucionFinancieraRequest request)
        {
            return _dataModelRepository.ActualizarEjecucion(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/itemproyecto/update/")]
        public dynamic ActualizarItemProyecto([FromBody] ItemProyectoRequest request)
        {
            return _dataModelRepository.ActualizarItemProyecto(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/iteminfofinanciera/update/")]
        public dynamic ActualizarIteminformacionFinanciera([FromBody] InformacionFinancieraRequest request)
        {
            return _dataModelRepository.ActualizarItemInfoFinanciera(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/itemfecha/update/")]
        public dynamic ActualizarFecha([FromBody] FechasEntregasRequest request)
        {
            return _dataModelRepository.ActualizarItemFechas(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/itemobservaciones/update/")]
        public dynamic Actualizarobs([FromBody] ProyectadosRequest request)
        {
            return _dataModelRepository.ActualizarItemParticipanteObservaciones(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/listparticipante/update/")]
        public dynamic ActualizarListparticpante([FromBody] ProyectadosRequest request)
        {
            return _dataModelRepository.ActualizarItemParticipanteObservaciones(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/proyectos/municipio/update/")]
        public dynamic ActualizarMunicioio([FromBody] MunicipioRequest request)
        {
            return _dataModelRepository.ActualizarItemMunicipio(request);
        }

     
    }
}
