using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Repositories;
using ApiRestAldeasPresupuesto.Models;
using ApiRestAldeasPresupuesto.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiRestAldeasPresupuesto.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InformesController : ControllerBase
    {
        // GET: /<controller>/
        #region propiedades

        private readonly IDataModelPresupuesto _dataModelRepository;


        #endregion

        private readonly ILogger<InformesController> _logger;

        public InformesController(IDataModelPresupuesto dataModelRepository, ILogger<InformesController> logger)
        {
            _logger = logger;
            _dataModelRepository = dataModelRepository;
        }

        //[Authorize]
        //[HttpGet]
        //[Route("/api/generarinforme/consultar/{id}")]
        //public dynamic Consultar(long id)
        //{
        //    PresupuestoProgramRequest request = new PresupuestoProgramRequest();
        //    request.IdPresupuesto = id;
        //    return _dataModelRepository.ConsultarDetallePresupuestoPrograma(request);
        //}

        [HttpGet]
        [Route("/api/generarinforme/consultar/{id}")]
        public IActionResult GetWorkbook(long id)
        {
            PresupuestoProgramRequest request = new PresupuestoProgramRequest();
            request.IdPresupuesto = id;
           var nombre= _dataModelRepository.GenerarInforme(request);

            var stream = new FileStream(@nombre, FileMode.Open);
            return File(stream, "application/octet-stream");
        }
    }
}
