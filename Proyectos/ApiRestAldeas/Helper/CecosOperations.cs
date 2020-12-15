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



        public static dynamic UpdateCeco(IContextFactory factory, IOptions<ConnectionDB> connection, long id,
                    int idSubcentroNuevo)
        {
            List<ColaboradorInforFinanciera> retorno = new List<ColaboradorInforFinanciera>();
            int Exito = 200;

            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataCentros = from centros in db.TbCICentroCostos
                                  where centros.id == id
                                  select centros;


                if (dataCentros.Any())
                {

                    var subCentros = from sub in db.tbSubcentros
                                     where sub.id == idSubcentroNuevo
                                     select sub;

                    if (subCentros.Any())
                    {
                        dataCentros.First().id_SubCentroCosto = subCentros.First().id;
                        dataCentros.First().Codigo = subCentros.First().SubCentroCosto;
                        db.SaveChanges();
                    }
                    else
                    {
                        Exito = 300;
                    }
                
                }
            }
            return new { id = 0, status = Exito==200? "OK": "VALIDAR DATOS", code = Exito };
        }
    }
}
