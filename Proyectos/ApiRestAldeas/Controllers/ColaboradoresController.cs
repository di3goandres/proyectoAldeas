using System;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColaboradoresController
    {
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;


        private readonly ILogger<ColaboradoresController> _logger;

        public ColaboradoresController(IDataModelRepository dataModelRepository, ILogger<ColaboradoresController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }
        #endregion


        //[Authorize]
        [HttpGet]
        [Route("/api/aldeas/proyecto/obtenercolaboradores/{id}")]
        public dynamic ConsultarProyectosColaborador(long id)
        {
            return _dataModelRepository.ConsultarColaboradorProyecto(id);
        }

        //[Authorize]
        [HttpGet]
        [Route("/api/aldeas/colaborador/detalle/{id}")]
        public dynamic ConsultarDetalle(long id)
        {
            return _dataModelRepository.ConsultarDetalleColaboradorProyecto(id);
        }
    }
}
