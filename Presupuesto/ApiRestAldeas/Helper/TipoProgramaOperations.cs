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
    public class TipoProgramaOperations
    {
        public static dynamic ConsultarTipoProgramas(IContextFactory factory, IOptions<ConnectionDB> connection)
        {

            TipoProgramaResponse retorno = new TipoProgramaResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                long idPrograma = 0;

                var data = from pro in db.TbTipoPrograma
                                
                                  select new TipoProgramaResponseData
                                  {
                                      id = pro.id,
                                      nombre = pro.nombre,
                                      cobertura = pro.cobertura,
                                      fecha_actualizacion = pro.fecha_actualizacion,
                                      fecha_creacion = pro.fecha_creacion,



                                  }; ;
                if (data.Any())
                {
                    retorno.Data = data.ToList();
                }
              

            }

            return retorno;
        }

    }
}
