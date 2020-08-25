using System;
using ApiRestAldeas.Entities;
namespace ApiRestAldeas.Models
{

    public class AuthenticateResponse
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public bool Administrador { get; set; }

        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            DisplayName = user.DisplayName;
            Username = user.Username;
            Token = token;
        }
    }
}
