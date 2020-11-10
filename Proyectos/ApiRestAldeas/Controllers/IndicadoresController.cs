using System;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IndicadoresController : ControllerBase
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;

        #endregion

        private readonly ILogger<IndicadoresController> _logger;

        public IndicadoresController(IDataModelRepository dataModelRepository, ILogger<IndicadoresController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }


        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/indicadores/obtener")]
        public dynamic consultar()
        {
            return _dataModelRepository.ConsultarIndicadores();
        }

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/indicadores/obtenerPreguntas/{id}")]
        public dynamic ObtenerPreguntasIndicadores(string id)
        {
            return _dataModelRepository.ConsultarPreguntasIndicadores(id);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/indicadores/GuardarRespuestas/")]
        public dynamic GuardarRespuestasIndicadores([FromBody]  IndicadoresRequest request)
        {
            return _dataModelRepository.AsociarIndicadorParticipante(request);
        }
    }
}
