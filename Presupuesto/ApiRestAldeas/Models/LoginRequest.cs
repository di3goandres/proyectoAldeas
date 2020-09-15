using System;
namespace ApiRestAldeas.Models
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class ExisteRequest
    {
        public string Username { get; set; }
        
    }
}
