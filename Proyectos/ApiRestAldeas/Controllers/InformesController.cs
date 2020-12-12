using System;
using System.IO;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InformesController : ControllerBase
    {
        // GET: /<controller>/
        #region propiedades

        private readonly IDataModelRepository _dataModelRepository;


     
        private readonly ILogger<InformesController> _logger;

        public InformesController(IDataModelRepository dataModelRepository, ILogger<InformesController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }


        #endregion

        [HttpGet]
        [Route("/api/proyectos/informe/consultar/{id}")]
        public IActionResult GetWorkbook(long id)
        {
      
            var nombre = _dataModelRepository.ConsultarExcelProyectosByID(id);
            if (nombre == null || string.IsNullOrEmpty(nombre) )
                return BadRequest(new { message = "No se pudo crear el archivo" });
            var stream = new FileStream(@nombre, FileMode.Open);
            return File(stream, "application/octet-stream", nombre);
        }

        [HttpGet]
        [Route("/api/proyectos/informe/exportDatabase/")]
        public IActionResult GetexportDatabase()
        {

            var nombre = _dataModelRepository.ExportExcelProyectos();
            if (nombre == null || string.IsNullOrEmpty(nombre))
                return BadRequest(new { message = "No se pudo crear el archivo" });
            var stream = new FileStream(@nombre, FileMode.Open);
            return File(stream, "application/octet-stream", nombre);
        }
    }
}
