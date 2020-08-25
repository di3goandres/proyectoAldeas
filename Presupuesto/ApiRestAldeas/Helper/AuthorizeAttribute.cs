using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using ApiRestAldeas.Entities;
using ApiRestAldeas.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
      
        var token = context.HttpContext.Request.Headers.ContainsKey("Authorization");
        if (token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!JwtMiddleware.Validate(tokenHeader))
            {
                 context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
           
        }
        else
        {
            // not logged in
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
