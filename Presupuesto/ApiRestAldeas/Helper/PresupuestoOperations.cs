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
    public class PresupuestoOperations
    {

        public static dynamic ConsultarProgramas(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            PresupuestoResponse retorno = new PresupuestoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbProgramas
                           where pro.Estado == true
                           select new ProgramPresupuesto
                           {
                               Id = pro.id,
                               Nombre = pro.Nombre
                           };
                if (data.Any())
                {
                    retorno.Programas = data.ToList();
                }
                var dataCecos = from cecos in db.TbProgramasCecos
                                where cecos.Estado == true
                                select new PresupuestoProgramCeco
                                {
                                    IdPrograma = cecos.idPrograma,
                                    CodigoCeco = cecos.CodigoCeco,
                                    Nombre = cecos.Nombre,
                                
                                };
                if (dataCecos.Any())
                {
                    retorno.Cecos = dataCecos.Distinct().ToList();
                }

                var dataSubCecos = from cecos in db.TbProgramasCecos
                                where cecos.Estado == true
                                select new PresupuestoSubCeco
                                {
                                    IdCeco = cecos.CodigoCeco,
                                    SubCentro = cecos.SubCentro,
                                    NombreSubCentro = cecos.NombreSubCentro,
                                    FacilityNav = cecos.FacilityNav,

                                    Id = cecos.id,
                                };

                if (dataSubCecos.Any())
                {
                    retorno.PresupuestoSubCeco = dataSubCecos.ToList();
                }
                var dataCategorias = from rubro in db.TbRubros
                                     where rubro.Estado == true
                           select new PresupuestoCategoria
                           {
                               Id = rubro.id,
                               Nombre = rubro.Nombre,
                               EsNomina =rubro.esNomina,
                               Esppto = rubro.EsPptp
                           };
                if (dataCategorias.Any())
                {
                    retorno.Categorias = dataCategorias.ToList();
                }
                var dataPucs = from puc in db.TbPucs
                               where puc.Estado == true
                               select new PresupuestoCategoriaPuc
                               {
                                  
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
                                  
                               };
                if (dataPucs.Any())
                {
                    retorno.Pucs = dataPucs.ToList();
                }

            }

            return retorno;
        }

    }
}
