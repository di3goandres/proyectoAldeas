using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;

using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Helper
{
    public class ProyectoOperations
    {
       public static dynamic ConsultarProyecto(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           select pro;

                var proyectos = JsonConvert.SerializeObject(data);
                return proyectos;
              

            }
        }
    }
}
