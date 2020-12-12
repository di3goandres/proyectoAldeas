using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using static ApiRestAldeas.Entities.Appsettings;
using System.Linq;
using ApiRestAldeas.Models;
using System.Collections.Generic;

namespace ApiRestAldeas.Helper
{
    public class MunicipioOperations
    {
        

        /// <summary>
        /// Metodo para obtener los datos del los municipios
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="connection"></param>
        /// <returns></returns>
        public static DepartamentoResponse obtenerDatos(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            DepartamentoResponse retorno = new DepartamentoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbDepartamentos
                           
                           select  new Departamento
                            {
                               Codigo =pro.id_departamento,
                               Nombre = pro.departamento
                           };
                
                retorno.Departamentos = data.ToList();


                var municpios = from pro in db.tbMunicipios
                           select new Municipio
                           {
                               Activo = false,
                               Codigo = pro.id,
                               CodigoDepartamento = pro.cod_dane_departamento,
                               Nombre = pro.municipio

                           };
             
                retorno.Municipios = municpios.ToList();
                
                return retorno;


            }
        }

        public static dynamic ExportData(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            List<ProyectoMunicipioResponse> retorno = new List<ProyectoMunicipioResponse>();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataMunicipios = from munipro in db.tbMunicipioProyectos
                                     join muni in db.tbMunicipios on munipro.id_municipio equals muni.id
                                     join depar in db.tbDepartamentos on muni.cod_dane_departamento equals depar.id_departamento

                                     select new ProyectoMunicipioResponse
                                     {

                                         id = munipro.id,
                                         id_proyecto = munipro.id_proyecto,
                                         id_departamento = depar.departamento,
                                         id_municipio = muni.municipio

                                     };

                if (dataMunicipios.Any())
                {
                    retorno = dataMunicipios.ToList();
                }
            }
            return retorno;
        }
    }
}
