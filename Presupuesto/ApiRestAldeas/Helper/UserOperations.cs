using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
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
                
                    retorno = data.FirstOrDefault().administrador;
                }

            }
            return retorno;
        }

        public static dynamic AgregarUsuario(IContextFactory factory, IOptions<ConnectionDB> connection, DBAdministrador usuario)
        {

            long id = 0;

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbAdministradores
                           where pro.username == usuario.username
                           select pro;

                if (!data.Any())
                {
                    var nuevo = new DBAdministrador();
                    nuevo.administrador = usuario.administrador;
                    nuevo.username = usuario.username;
                    db.TbAdministradores.Add(nuevo);
                    db.SaveChanges();
                    id = nuevo.id;


                }
            }
            return new { id = id, status = id == 0 ? "ERROR" : "OK", code = 200, message="EXITOSO" };

        }
        public static dynamic ListaUsuarios(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            UsuariosProgramasResponse retorno = new UsuariosProgramasResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbAdministradores
                           select pro;

                if (data.Any())
                {
                    retorno.Usuarios = data.ToList();
                }
            }
            return retorno;
        }


        public static dynamic ListaProgramasUsuarios(IContextFactory factory, IOptions<ConnectionDB> connection, long idUsuario)
        {
            UsuariosListaProgramasResponse retorno = new UsuariosListaProgramasResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
               
                var data = from pro in db.TbProgramas
                           join user in db.TbUsuariosProgramas on pro.id equals user.id_programa
                           where user.id_usuario == idUsuario
                           select pro;

                if (data.Any())
                {
                    retorno.Programas = data.ToList();
                }

            }
            return retorno;
        }

        public static dynamic AsociarProgramasUsuarios(IContextFactory factory, IOptions<ConnectionDB> connection, List<UsuarioProgramaRequest> request)
        {
            List<DbProgramas> retorno = new List<DbProgramas>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                List<DBUsuariosProgramas> agregar = new List<DBUsuariosProgramas>();
                foreach (var item in request)
                {
                    var data = from pro in db.TbUsuariosProgramas
                               where pro.id_usuario == item.Usuario && pro.id_programa == item.Programa
                               select pro;
                    if (!data.Any())
                    {
                        var dat = data.ToList();
                        agregar.Add(new DBUsuariosProgramas()
                        {
                            id_programa = item.Programa,
                            id_usuario = item.Usuario
                        });
                    }
                }
                if (agregar.Count > 0)
                {
                    db.TbUsuariosProgramas.AddRange(agregar);
                    db.SaveChanges();
                }
            }
            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic QuitarProgramasUsuarios(IContextFactory factory, IOptions<ConnectionDB> connection, List<UsuarioProgramaRequest> request)
        {
            List<DbProgramas> retorno = new List<DbProgramas>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                List<DBUsuariosProgramas> agregar = new List<DBUsuariosProgramas>();
                foreach (var item in request)
                {
                    var data = from pro in db.TbUsuariosProgramas
                               where pro.id_usuario == item.Usuario && pro.id_programa == item.Programa
                               select pro;
                    if (data.Any())
                    {
                        foreach (var dat in data)
                        {
                            db.TbUsuariosProgramas.Remove(dat);
                        }
                        db.SaveChanges();
                      
                    }
                }
               
            }
            return new { id = 0, status = "OK", code = 200 };
        }

    }
}
