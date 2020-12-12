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
    public class FechasOperations
    {
        public static dynamic ExportData(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<FechasEntregas> retorno = new List<FechasEntregas>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataFechas = from fechas in db.tbFechaEntregas
                                
                                 select fechas;


                if (dataFechas.Any())
                {
                    retorno = dataFechas.ToList();
                }
            }
            return retorno;
        }
    }
}
