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
    public class EjecucionFinancieraOperations
    {
        public static dynamic ConsultarExport(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<TbEjecucion> ItemsEjecucion  = new List<TbEjecucion>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataEjecucion = from ejecu in db.tbEjecucion
                                   
                                    select ejecu;

                if (dataEjecucion.Any())
                {
                    ItemsEjecucion = dataEjecucion.ToList();
                }
            }
            return ItemsEjecucion;
        }
    }
}
