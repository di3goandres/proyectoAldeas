﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
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
        [Route("/api/presupuesto/programas/")]
        public dynamic consultar()
        {
            return _dataModelRepository.ConsultarProgramas();
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/programas/Guardar/")]
        public dynamic guardarProyecto([FromBody] ProgramasRequest programasRequest)
        {
            return _dataModelRepository.GuardarPrograma(programasRequest);
        }
        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/programas/actualizar/")]
        public dynamic ActualizarProyecto([FromBody] ProgramaUpdateRequest programasRequest)
        {
            return _dataModelRepository.ActualizarPrograma(programasRequest);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/ceco/actualizar/")]
        public dynamic ActualizarCeco([FromBody] CecoUpdateRequest request)
        {
            return _dataModelRepository.ActualizarCeco(request);
        }



        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/categorias/")]
        public dynamic ConsultarCategorias()
        {
            return _dataModelRepository.ConsultarCategorias();
        }

        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/categoriaspucs/")]
        public dynamic ConsultarCategoriasPucs()
        {
            return _dataModelRepository.ConsultarCategoriasPucs();
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/categoria/update")]
        public dynamic ActualizarCategoria(CategoriUpdateRequest request)
        {
            return _dataModelRepository.ActualizarCategoria(request);
        }


        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/pucs/update")]
        public dynamic ActualizarPuc(PucRequestUpdate request)
        {
            return _dataModelRepository.ActualizarPuc(request);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/categoria/create")]
        public dynamic CreateCategoria(CategoriaRequest request)
        {
            return _dataModelRepository.CrearCategoria(request);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/categoria/addpuc")]
        public dynamic AgregarPucACategoria(PucRequestUpdate request)
        {
            return _dataModelRepository.AgregarPucACategoria(request);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/presupuesto/programas/addceco/")]
        public dynamic AgregarCecoAPrograma(CecoUpdateRequest request)
        {
            return _dataModelRepository.AgregarCecoPrograma(request);
        }



        #region PResupuesto

        //[Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getinfodata/{id}")]
        public dynamic ConsultarDatos(long id)
        {
            return _dataModelRepository.PresupuestoObtenerPogramasCecos(id);
        }


        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getdetalle/{id}")]
        public dynamic ConsultarDetallePresupuestoPrograma(long id)
        {
            PresupuestoProgramRequest request = new PresupuestoProgramRequest();
            request.IdPresupuesto = id;
            return _dataModelRepository.ConsultarDetallePresupuestoPrograma(request);
        }
        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/getlistpresupuestobyProgram/")]
        public dynamic ConsultarPresupuestoPrograma(PresupuestoProgramRequest request)
        {
            return _dataModelRepository.ConsultarListaPresupuestoByProgram(request);
        }

        [Authorize]
        [HttpGet]
        [Route("/api/presupuesto/getlistpuc/{id}")]
        public dynamic ActualizarPresupuesto(long id)
        {
            return _dataModelRepository.ObtenerPucByRubro(id);
        }
        [Authorize]

        [HttpPost]
        [Route("/api/presupuesto/storedetalle/")]
        public dynamic GuardarDetallePresupuesto(DbPresupuestoPrograma request)
        {
          
            return _dataModelRepository.GuardarPresupuestoDetalle(request);
        }

        [Authorize]

        [HttpPost]
        [Route("/api/presupuesto/updatedetalle/")]
        public dynamic UpdateDetallePresupuesto(DbPresupuestoPrograma request)
        {

            return _dataModelRepository.ActualizarPresupuesto(request);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/store/")]
        public dynamic GuardarPresupuesto(DbPresupuesto request)
        {
            return _dataModelRepository.GuardarPresupuesto(request);
        }
        [Authorize]
        [HttpPost]
        [Route("/api/presupuesto/update/")]
        public dynamic ActualizarPresupuesto(DbPresupuesto request)
        {
            return _dataModelRepository.ActualizarPresupuesto(request);
        }

       
        #endregion 


    }
}
