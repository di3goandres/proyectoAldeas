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

        public static dynamic AgregarActualizarUsuario(IContextFactory factory, IOptions<ConnectionDB> connection, Usuarios usuario)
        {

            long id = 0;

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbUsuarios
                           where pro.username == usuario.username
                           select pro;

                if (!data.Any())
                {
                    var nuevo = new Usuarios();
                    nuevo.IdPerfil = usuario.IdPerfil;
                    nuevo.username = usuario.username;
                    db.SaveChanges();
                    id = nuevo.id;
                }
                else
                {
                    var nuevo = data.First();
                    nuevo.IdPerfil = usuario.IdPerfil;
                    db.SaveChanges();
                    id = nuevo.id;
                }
            }
            return new { id = id, status = id == 0 ? "ERROR" : "OK", code = 200, message = "EXITOSO" };

        }
    }
}
