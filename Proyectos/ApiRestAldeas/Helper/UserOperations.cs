using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;

using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;


namespace ApiRestAldeas.Helper
{
    public class UserOperations
    {
        public static dynamic EsAdministrador(IContextFactory factory, IOptions<ConnectionDB> connection, String user)
        {

            string retorno = "";
          
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbUsuarios
                           join p in db.TbPerfiles on pro.IdPerfil equals p.id
                           where pro.username == user
                           select p;

                if (data.Any())
                {

                    retorno = data.FirstOrDefault().perfil;
                }

            }
            return retorno;
        }
    }
}
