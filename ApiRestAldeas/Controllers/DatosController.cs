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



        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosColombia/")]
        public dynamic consultar()
        {
            return _dataModelRepository.DatosColombia();
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/GuardarProyecto/")]
        public dynamic guardarProyecto([FromBody] ProyectoRequest proyectoRequest)
        {
            return _dataModelRepository.GuardarRegistroProyecto(proyectoRequest);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/GuardarRegistroParticipantes/")]
        public dynamic GuardarRegistroParticipantes([FromBody] RegistroParticipantesRequest request)
        {

            return _dataModelRepository.GuardarRegistroParticipantes(request);
          
        }

        [Authorize]
        [HttpPost]
        [Route("/api/aldeas/GuardarColaborador/")]
        public dynamic GuardarColaborador([FromBody] ColaboradorRequest request)
        {
            return _dataModelRepository.GuardarRegistroColaborador(request);
        }

        [HttpPost]
        [Route("/api/aldeas/GuardarProyectoArchivo/")]
        public dynamic guardarProyecto([FromForm] FileInputModel proyectoRequest)
        {
            var excelLargo = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            if (proyectoRequest.File.ContentType.Contains("application/vnd.ms-excel")
                || proyectoRequest.File.ContentType.Contains("application/pdf")
                || proyectoRequest.File.ContentType.Contains("contenidoapplication/octet-stream")
                || proyectoRequest.File.ContentType.Contains(excelLargo))
            {
                return _dataModelRepository.UploadFile(proyectoRequest);

            }
            else
            {
                return new
                {
                    code = 200,
                    status = "error",
                    message = "No se permite este tipo de contenido" + proyectoRequest.File.ContentType
                };
            }
        }

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosCentroCostos/")]
        public dynamic ConsultarCentroCostos()
        {
            return _dataModelRepository.CentroCostos();
        }



        //[Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosProyectos/")]
        public dynamic ConsultarProyectos()
        {
            return _dataModelRepository.ConsultarProyectos();
        }





    }
}
