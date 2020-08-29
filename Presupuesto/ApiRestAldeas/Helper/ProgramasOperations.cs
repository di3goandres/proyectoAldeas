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

        public static dynamic ActualizarPrograma(IContextFactory factory, IOptions<ConnectionDB> connection, ProgramaUpdateRequest programasRequest)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbProgramas
                           where pro.id == programasRequest.Id
                           select pro;
                if (data.Any())
                {
                    data.First().Nombre = programasRequest.Nombre;
                    data.First().Estado = programasRequest.Estado;
                    data.First().FechaActualizacion = DateTime.Now;

                    db.SaveChanges();
                }
            }
            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic ActualizarCeco(IContextFactory factory, IOptions<ConnectionDB> connection, CecoUpdateRequest cecoRequest)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbProgramasCecos
                           where pro.id == cecoRequest.Id
                           select pro;
                if (data.Any())
                {
                    data.First().Nombre = cecoRequest.Nombre;
                    data.First().Estado = cecoRequest.Estado;
                    data.First().NombreSubCentro = cecoRequest.NombreSubCentro;
                    data.First().FacilityNav = cecoRequest.FacilityNav;
                    db.SaveChanges();
                }
            }
            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic AgregarCecoAPrograma(IContextFactory factory, IOptions<ConnectionDB> connection, CecoUpdateRequest cecoRequest)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevo = new DbCecos()
                {
                    idPrograma = cecoRequest.IdPrograma,
                    Nombre = cecoRequest.Nombre,
                    CodigoCeco = cecoRequest.CodigoCeco,
                    Estado = true,
                    FacilityNav = cecoRequest.FacilityNav,
                    NombreSubCentro = cecoRequest.NombreSubCentro,
                    SubCentro = cecoRequest.SubCentro

                };
                db.TbProgramasCecos.Add(nuevo);
                db.SaveChanges();

            }
            return new { id = 0, status = "OK", code = 200 };
        }



    }
}
