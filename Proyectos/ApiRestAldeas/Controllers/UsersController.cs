using System;
using System.Threading.Tasks;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
using ApiRestAldeas.Repositories.User;
using ApiRestAldeas.Services;
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

        private readonly IUserModelRepository _UserModel;




        #endregion

        public UsersController(IUserService userService, IUserModelRepository UserModel)
        {
            _userService = userService;
            _UserModel = UserModel;
        }

        [HttpPost]
        [Route("/api/user/authenticate/")]
        public IActionResult Authenticate(LoginRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect"});

            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        [Route("/api/user/agregaractualizar/")]
        public dynamic AgregarUsuario(Usuarios usuario)
        {
            var response = _userService.Existe(usuario);
            if (response)
            {
                return _UserModel.Agregar(usuario);

            }
            else
            {
                return ( new { id = 0, status = "ERROR", code = 300, message = "NO EXISTE" });

            }
        }

    }
}
