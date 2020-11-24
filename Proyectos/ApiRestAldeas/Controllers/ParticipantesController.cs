using System;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParticipantesController
    {

        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;


        private readonly ILogger<ParticipantesController> _logger;

        public ParticipantesController(IDataModelRepository dataModelRepository, ILogger<ParticipantesController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }
        #endregion

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/participante/obtenerDetalleParticipante/{id}")]
        public dynamic ConsultarDetalle(long id)
        {
            return _dataModelRepository.ConsultarDetalleParticipante(id);
        }
    }
}
