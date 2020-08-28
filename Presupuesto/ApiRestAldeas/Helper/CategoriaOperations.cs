using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class CategoriaOperations
    {

        public static dynamic ConsultarCategorias(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            CategoriaResponse retorno = new CategoriaResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from rubro in db.TbRubros
                           select new Categoria
                           {
                               Estado = rubro.Estado,
                               FechaActualizacion = rubro.FechaActualizacion,
                               FechaCreacion = rubro.FechaCreacion,
                               Id = rubro.id,
                               Nombre = rubro.Nombre
                           };
                if (data.Any())
                {
                    retorno.Categorias = data.ToList();
                    retorno.Pucs = new List<CategoriaPuc>();
                }
            }

            return retorno;
        }


        public static dynamic ConsultarCategoriasPucs(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            CategoriaResponse retorno = new CategoriaResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from rubro in db.TbRubros
                           select new Categoria
                           {
                               Estado = rubro.Estado,
                               FechaActualizacion = rubro.FechaActualizacion,
                               FechaCreacion = rubro.FechaCreacion,
                               Id = rubro.id,
                               Nombre = rubro.Nombre
                           };
                if (data.Any())
                {
                    retorno.Categorias = data.ToList();
                }
                var dataPucs = from puc in db.TbPucs
                               select new CategoriaPuc
                               {
                                   Estado = puc.Estado,
                                   Id = puc.id,
                                   IdCategoria = puc.idRubro,
                                   Tipo = puc.Tipo,
                                   CuentaSIIGO = puc.CuentaSIIGO,
                                   DescripcionCuenta = puc.DescripcionCuenta,
                                   CuentaNAV = puc.CuentaNAV,
                                   DetalleCuentaNav = puc.DetalleCuentaNav,
                                   TipoCuentaNav = puc.TipoCuentaNav,
                                   FichaBanco = puc.FichaBanco,
                                   Casa = puc.Casa,
                                   RequiereNotaIngles = puc.RequiereNotaIngles,
                                   FechaCreacion = puc.FechaCreacion,
                                   FechaActualizacion = puc.FechaActualizacion,
                               };
                if (dataPucs.Any())
                {
                    retorno.Pucs = dataPucs.ToList();
                }

            }

            return retorno;
        }



        public static dynamic ActualizarCategoria(IContextFactory factory, IOptions<ConnectionDB> connection, CategoriUpdateRequest request)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbRubros
                           where pro.id == request.Id
                           select pro;
                if (data.Any())
                {
                    data.First().Nombre = request.Nombre;
                    data.First().Estado = request.Estado;
                    data.First().FechaActualizacion = DateTime.Now;

                    db.SaveChanges();
                }
            }
            return new { id = 0, status = "OK", code = 200 };
        }

        public static dynamic ActualizarPuc(IContextFactory factory, IOptions<ConnectionDB> connection, PucRequestUpdate request)
        {
            ProgramasResponse retorno = new ProgramasResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbPucs
                           where pro.id == request.Id
                           select pro;
                if (data.Any())
                {
                    data.First().Tipo = request.Tipo;
                    data.First().CuentaSIIGO = request.CuentaSIIGO;
                    data.First().DescripcionCuenta = request.DescripcionCuenta;
                    data.First().CuentaNAV = request.CuentaNAV;
                    data.First().TipoCuentaNav = request.TipoCuentaNav;

                    data.First().RequiereNotaIngles = request.RequiereNotaIngles;

                    data.First().DetalleCuentaNav = request.DetalleCuentaNav;
                    data.First().FichaBanco = request.FichaBanco;
                    data.First().Casa = request.Casa;
                    data.First().Estado = request.Estado;
                    data.First().FechaActualizacion = DateTime.Now;

                    db.SaveChanges();
                }
            }
            return new { id = 0, status = "OK", code = 200 };
        }

    }
}
