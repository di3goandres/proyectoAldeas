using System;
namespace ApiRestAldeas.Entities
{
    public class Appsettings
    {


        public class ConnectionDB
        {
            public string Conexion { get; set; }
        }

        public class Token
        {
            public string JWT_SECRET_KEY { get; set; }
            public string JWT_AUDIENCE_TOKEN { get; set; }
            public string JWT_ISSUER_TOKEN { get; set; }
            public string JWT_EXPIRE_MINUTES { get; set; }
        }

    }
}
