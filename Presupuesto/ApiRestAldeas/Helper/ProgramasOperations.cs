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
    public class ProgramasOperations
    {
        public static dynamic ConsultarProgramas(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbProgramas
                           where pro.Estado == true
                           select new Program
                           {
                               Estado = pro.Estado,
                               FechaActualizacion = pro.FechaActualizacion,
                               FechaCreacion = pro.FechaCreacion,
                               Id = pro.id,
                               Nombre = pro.Nombre
                           };
                if (data.Any())
                {
                    retorno.Programas = data.ToList();
                }
                var dataCecos = from cecos in db.TbProgramasCecos
                                where cecos.Estado == true
                                select new ProgramCeco
                                {
                                    Estado = cecos.Estado,
                                    IdPrograma = cecos.idPrograma,
                                    CodigoCeco = cecos.CodigoCeco,
                                    Nombre = cecos.Nombre,
                                    SubCentro = cecos.SubCentro,
                                    NombreSubCentro = cecos.NombreSubCentro,
                                    Id = cecos.id,
                                    FacilityNav = cecos.FacilityNav
                                };
                if (dataCecos.Any())
                {
                    retorno.Cecos = dataCecos.ToList();
                }




            }

            return retorno;
        }

        public static dynamic GuardarProgramas(IContextFactory factory, IOptions<ConnectionDB> connection, ProgramasRequest programasRequest)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevo = new DbProgramas()
                {
                    Estado = true,
                    FechaCreacion = DateTime.Now,
                    FechaActualizacion = DateTime.Now,
                    Nombre = programasRequest.Nombre

                };
                db.TbProgramas.Add(nuevo);
                db.SaveChanges();
                id = nuevo.id;

                List<DbCecos> listCeCos = new List<DbCecos>();

                foreach (var item in programasRequest.Cecos)
                {
                    listCeCos.Add(new DbCecos()
                    {
                        idPrograma = id,
                        Nombre = item.Nombre,
                        CodigoCeco = item.CodigoCeco,
                        Estado = true,
                        FacilityNav = item.FacilityNav,
                        NombreSubCentro = item.NombreSubCentro,
                        SubCentro = item.SubCentro

                    });
                }
                db.TbProgramasCecos.AddRange(listCeCos);
                db.SaveChanges();
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }
    }
}
