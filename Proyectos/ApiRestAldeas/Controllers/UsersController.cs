using System;
using System.Threading.Tasks;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using ApiRestAldeas.Repositories.User;
using ApiRestAldeas.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        #region propiedades
        private IUserService _userService;

        private readonly IUserModelRepository _UserModel;

        private readonly ILogger<UsersController> _logger;


        #endregion

        public UsersController(IUserService userService, IUserModelRepository UserModel, ILogger<UsersController> logger)
        {
            _userService = userService;
            _UserModel = UserModel;
            _logger = logger;
        }

        [HttpPost]
        [Route("/api/user/authenticate/")]
        public IActionResult Authenticate(LoginRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null || response.Perfil =="")
                return BadRequest(new { message = "Username or password is incorrect"});

            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/user/agregar/")]
        public dynamic AgregarUsuario(Usuarios usuario)
        {
            var response = _userService.Existe(usuario);
            _logger.LogInformation("Datos de entrada id = {0}, perfil {1}, username {2},  existe: {3}", usuario.id, usuario.IdPerfil, usuario.username, response);
            if (response)
            {
                return _UserModel.Agregar(usuario);

            }
            else
            {
                return ( new { id = 0, status = "ERROR", code = 300, message = "NO EXISTE" });

            }
        }

        [Authorize]
        [HttpPost]
        [Route("/api/user/actualizar/")]
        public dynamic ActualizarUsuario(Usuarios usuario)
        {
               return _UserModel.Agregar(usuario);

        }

        [Authorize]
        [HttpPost]
        [Route("/api/user/eliminarusuario/")]
        public dynamic Eliminar(Usuarios usuario)
        {
          
          return _UserModel.Eliminar(usuario);
          
        }

        [Authorize]
        [HttpGet]
        [Route("/api/user/obtenerUsuarios/")]
        public dynamic Consultar()
        {
            return _UserModel.ConsultarUsuarios();

        }

    }
}
