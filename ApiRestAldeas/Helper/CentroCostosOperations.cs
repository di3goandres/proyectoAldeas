using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Models;
using static ApiRestAldeas.Entities.Appsettings;
using System.Linq;
using Microsoft.Extensions.Options;

namespace ApiRestAldeas.Helper
{
    public class CentroCostosOperations
    {
        /// <summary>
        /// Metodo para obtener los datos del los Centros de Costos
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="connection"></param>
        /// <returns></returns>
        public static CentrosResponse obtenerDatos(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            CentrosResponse retorno = new CentrosResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbCentros

                           select new Centro
                           {
                               CodigoCentro = pro.Codigo,
                               Nombre = pro.CentroCosto
                           };

                retorno.CentrosCostos = data.ToList();


                var subCentros = from pro in db.tbSubcentros
                                select new SubCentro
                                {
                                    CodigoSubCentro = pro.id,
                                    CodigoCentro = pro.CodigoCentro,
                                    Nombre = pro.SubCentroCosto

                                };

                retorno.SubCentro = subCentros.ToList();

                return retorno;


            }
        }
    }
}
