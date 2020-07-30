﻿using System;
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
       

        //private readonly IDataModelRepository _dataModelRepository;

        #endregion

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(LoginRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }


        //[Authorize]
        //[HttpGet]
        //[Route("/api/aldeas/consultar2/")]
        //public dynamic consultar()
        //{
        //    return _dataModelRepository.GuardarProyecto();
        //}
    }
}
