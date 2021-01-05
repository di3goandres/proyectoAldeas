using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using ApiRestAldeas.Services;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        #region propiedades
        private IUserService _userService;
        private readonly IDataModelRepository _dataModelRepository;



        #endregion

        public UsersController(IUserService userService, IDataModelRepository dataModelRepository)
        {
            _userService = userService;
            _dataModelRepository = dataModelRepository;

        }

        [HttpPost]
        [Route("/api/user/authenticate/")]
        public IActionResult Authenticate(LoginRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null || response.Perfil == "")
                return BadRequest(new { message = "Username or password is incorrect" });

            //response.Administrador = _dataModelRepository.EsAdministrador(model.Username);
            return Ok(response);
        }




        [AuthorizeUser]
        [HttpPost]
        [Route("/api/user/agregar/")]
        public dynamic AgregarUsuario(DBAdministrador usuario)
        {
            var response = _userService.Existe(usuario);
            if (response)
            {
                return _dataModelRepository.AgregarUsuario(usuario);

            }
            else
            {
                return new { id = 0, status = "ERROR", code = 200, message = "NO EXISTE" };

            }
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/user/actualizar/")]
        public dynamic ActualizarUsuario(DBAdministrador usuario)
        {
            var response = _userService.Existe(usuario);
            if (response)
            {
                return _dataModelRepository.ActualizarUsuario(usuario);

            }
            else
            {
                return new { id = 0, status = "ERROR", code = 200, message = "NO EXISTE" };

            }
        }
        [Authorize]
        [HttpGet]
        [Route("/api/user/listar/")]
        public dynamic ListaUsuarios()
        {
            return _dataModelRepository.ListaUsuarios();
        }
        [Authorize]
        [HttpGet]
        [Route("/api/user/listarProgramas/{id}")]
        public dynamic ListaProgramasUsuarios(long id)
        {
            return _dataModelRepository.ListaProgramasUsuarios(id);
        }
        [AuthorizeUser]
        [HttpPost]
        [Route("/api/user/asociarPrograma/")]
        public dynamic AsociarProgramasUsuarios(List<UsuarioProgramaRequest> request)
        {
            return _dataModelRepository.AsociarProgramasUsuarios(request);
        }

        [AuthorizeUser]
        [HttpPost]
        [Route("/api/user/quitarPrograma/")]
        public dynamic QuitarProgramasUsuarios(List<UsuarioProgramaRequest> request)
        {
            return _dataModelRepository.QuitarProgramasUsuarios(request);
        }

        [Authorize]
        [HttpGet]
        [Route("/api/user/soloprogramas/{id}")]
        public dynamic ConsultarProgramas(long id)
        {
            return _dataModelRepository.ConsultarSoloProgramas(id);
        }

        [Authorize]
        [HttpGet]
        [Route("/api/user/soloprogramasToken/")]
        public dynamic ConsultarProgramasToken()
        {
            var data = JwtMiddleware.returnId();
            var id = _dataModelRepository.ObtenerID(data);
            return _dataModelRepository.ConsultarTokenProgramas(id);
        }
    }
}
