using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;

using static ApiRestAldeas.Entities.Appsettings;
using ApiRestAldeas.Models;
using System.Collections.Generic;
namespace ApiRestAldeas.Helper
{
    public class CecosOperations
    {
        public static dynamic ExportData(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<ColaboradorInforFinanciera> retorno = new List<ColaboradorInforFinanciera>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataCentros = from centros in db.TbCICentroCostos
                                 
                                  select centros;


                if (dataCentros.Any())
                {
                    retorno = dataCentros.ToList();
                }
            }
            return retorno;
        }
    }
}
