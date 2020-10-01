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
                           join tipo in db.TbTipoPrograma on pro.id_tipo_programa equals tipo.id
                           select new Program
                           {
                               Estado = pro.Estado,
                               FechaActualizacion = pro.FechaActualizacion,
                               FechaCreacion = pro.FechaCreacion,
                               Id = pro.id,
                               Nombre = pro.Nombre,
                               IdTipoPrograma = tipo.id,
                               TipoProgramaNombre  = tipo.nombre,
                               Cobertura = tipo.cobertura,
                               PerCapacitacion = pro.per_capacitacion,
                               PerNomina = pro.per_nomina,

                           };
                if (data.Any())
                {
                    retorno.Programas = data.ToList();
                }
                var dataCecos = from cecos in db.TbProgramasCecos
                                join financiado  in db.TbFinanciadores  on cecos.idFinanciador equals financiado.id
                                select new ProgramCeco
                                {
                                    Estado = cecos.Estado,
                                    IdPrograma = cecos.idPrograma,
                                    CodigoCeco = cecos.CodigoCeco,
                                    Nombre = cecos.Nombre,
                                    SubCentro = cecos.SubCentro,
                                    NombreSubCentro = cecos.NombreSubCentro,
                                    Id = cecos.id,
                                    FacilityNav = cecos.FacilityNav,
                                    IdFinanciador = financiado.id,
                                    NombreFinanciador = financiado.nombre
                                };
                if (dataCecos.Any())
                {
                    retorno.Cecos = dataCecos.ToList();
                }




            }

            return retorno;
        }


        /// <summary>
        /// consulta los programas faltantes del usuario.
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="connection"></param>
        /// <param name="id">usuario</param>
        /// <returns></returns>
        public static dynamic ConsultarSoloProgramas(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataUsuario = from usu in db.TbUsuariosProgramas
                                  where usu.id_usuario == id
                                  select new
                                  {
                                      id = usu.id_programa
                                  };

                var data = from pro in db.TbProgramas
                           join tipo in db.TbTipoPrograma on pro.id_tipo_programa equals tipo.id
                           where !dataUsuario.Any(d => d.id == pro.id) && pro.Estado == true
                           select new Program
                           {
                               Estado = pro.Estado,
                               FechaActualizacion = pro.FechaActualizacion,
                               FechaCreacion = pro.FechaCreacion,
                               Id = pro.id,
                               Nombre = pro.Nombre,
                               IdTipoPrograma = tipo.id,
                               TipoProgramaNombre = tipo.nombre,
                               Cobertura = tipo.cobertura,
                               PerCapacitacion = pro.per_capacitacion,
                               PerNomina = pro.per_nomina,
                           };
                if (data.Any())
                {
                  
                    retorno.Programas = data.ToList();
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
                    id_tipo_programa = programasRequest.Tipo,
                    FechaActualizacion = DateTime.Now,
                    per_capacitacion = 1.5M,
                    per_nomina = 10,

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
                        idFinanciador = item.IdFinanciador,
                        Nombre = item.Nombre,
                        CodigoCeco = item.CodigoCeco,
                        Estado = true,
                        FacilityNav = item.FacilityNav,
                        NombreSubCentro = item.NombreSubCentro,
                        SubCentro = item.SubCentro,
                        fecha_creacion = DateTime.Now,
                        fecha_actualizacion = DateTime.Now,


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
                    data.First().per_capacitacion = programasRequest.perCapacitacion;
                    data.First().per_nomina = programasRequest.perNomina;
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
                    data.First().fecha_actualizacion = DateTime.Now;

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
