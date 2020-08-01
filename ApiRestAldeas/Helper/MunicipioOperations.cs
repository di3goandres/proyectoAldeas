using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using static ApiRestAldeas.Entities.Appsettings;
using System.Linq;
using ApiRestAldeas.Models;

namespace ApiRestAldeas.Helper
{
    public class MunicipioOperations
    {
        


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
    }
}
