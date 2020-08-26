using System;
using System.Threading.Tasks;
using ApiRestAldeas.Models;
using ApiRestAldeas.Repositories;
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
            
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect"});

            response.Administrador = _dataModelRepository.EsAdministrador(model.Username);
            return Ok(response);
        }

      

    }
}
