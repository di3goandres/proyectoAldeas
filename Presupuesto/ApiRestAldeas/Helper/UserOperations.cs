using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class UserOperations

    {
        public static dynamic EsAdministrador(IContextFactory factory, IOptions<ConnectionDB> connection, String user)
        {

            bool retorno = false;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbAdministradores
                           where pro.username == user
                           select pro;

                if (data.Any())
                {
                    retorno = true;
                }

            }
            return retorno;
        }
    }
}
