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
    public class FinancieraOperations
    {
        public static dynamic ConsultarProyectoFinanciearaListas(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<InformacionFinanciera> retorno = new List<InformacionFinanciera>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var financiaera = from finacie in db.tbInformacionFinanciera
                                 
                                  select finacie;

                if (financiaera.Any())
                {
                    retorno = financiaera.ToList();
                }
            }
            return retorno;
        }

    }
}
