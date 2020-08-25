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
    }
}
