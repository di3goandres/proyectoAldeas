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
    public class FinanciadoresOperations
    {
        public static dynamic ConsultarFinanciadores(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            FinanciadorResponse retorno = new FinanciadorResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from financiadores in db.TbFinanciadores
                           select new FinanciadorData
                           {
                               Estado = financiadores.activo,
                               FechaActualizacion = financiadores.fecha_actualizacion,
                               FechaCreacion = financiadores.fecha_creacion,
                               Id = financiadores.id,
                               Nombre = financiadores.nombre
                           };
                if (data.Any())
                {
                    retorno.FinanciadoresData = data.ToList();
              
                }
            }

            return retorno;
        }
    }
}
