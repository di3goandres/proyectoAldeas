using System;
using System.Collections.Generic;
using System.IO;
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
               var data = _dataModelRepository.UploadFileAsync(proyectoRequest);

                return   new { id = 0, status = "OK", code = 200 };

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
        [Route("/api/aldeas/proyectos/informe/file/{id}")]
        public IActionResult GetFileProyect(long id)
        {

            ArchivoResponse data = _dataModelRepository.ConsultarArchivo(id);
            if (data.Idproyecto == 0)
            {
                return BadRequest(new { message = "No se pudo obtener el archivo" });
            }
            else
            {
                var TipoArchivo = "application/octet-stream";
                var nombre = "ProyectosFiles/" + id + "/" + data.NombreArchivo;
                if (data.TipoArchivo.Contains("pdf"))
                {
                    TipoArchivo= data.TipoArchivo;
                }
           
                var stream = new FileStream(@nombre, FileMode.Open);
                return File(stream, TipoArchivo, data.NombreArchivo);
            }

        }

        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosCentroCostos/")]
        public dynamic ConsultarCentroCostos()
        {
            return _dataModelRepository.CentroCostos();
        }



        [Authorize]
        [HttpGet]
        [Route("/api/aldeas/datosProyectos/")]
        public dynamic ConsultarProyectos()
        {
            return _dataModelRepository.ConsultarProyectos();
        }

        [HttpGet]
        [Route("/api/aldeas/proyectos/obtenerParticipantes/{id}")]
        public dynamic ConsultarParticioantes(long id)
        {
            return _dataModelRepository.ConsultarParticipantesProyecto(id);
        }





    }
}
