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

        public static dynamic ActualizarEjecucion(IContextFactory factory, IOptions<ConnectionDB> connection,
          EjecucionFinancieraRequest request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                foreach (var data in request.ItemsEjecucion)
                {

                    var registro = from dato in db.tbEjecucion
                                   where dato.id == data.id
                                   select dato;
                    if (registro.Any())
                    {

                        id = data.id;
                        registro.First().Enero = data.Enero;
                        registro.First().Febrero = data.Febrero;
                        registro.First().Marzo = data.Marzo;
                        registro.First().Abril = data.Abril;
                        registro.First().Mayo = data.Mayo;
                        registro.First().Junio = data.Junio;
                        registro.First().Julio = data.Julio;
                        registro.First().Agosto = data.Agosto;
                        registro.First().Sept = data.Sept;
                        registro.First().Octubre = data.Octubre;
                        registro.First().Noviembre = data.Noviembre;
                        registro.First().Diciembre = data.Diciembre;
                        db.SaveChanges();

                    }
                }



            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }

    }


}
