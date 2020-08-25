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
       

       
        #endregion

        public UsersController(IUserService userService)
        {
            _userService = userService;
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

      

    }
}
