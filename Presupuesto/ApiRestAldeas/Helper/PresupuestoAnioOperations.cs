using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class PresupuestoAnioOperations
    {
        /// <summary>
        /// consulta los presupuestos actuales
        /// es decir la version actual ya que puedeen existir varias versiones
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="connection"></param>
        /// <param name="idPrograma"></param>
        /// <returns></returns>
        public static dynamic Consultar(IContextFactory factory, IOptions<ConnectionDB> connection, long idPrograma)
        {
            PresupuestoAnioResponse retorno = new PresupuestoAnioResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from tpre in db.TbPresupuestoAnio
                           join pro in db.TbProgramas on tpre.idPrograma equals pro.id
                           join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                           where tpre.actual == true
                           select new PresupuestoAnioData
                           {
                               id = tpre.id,
                               NombrePrograma = pro.Nombre,
                               TipoPrograma = tpro.nombre,
                               Cobertura = tpro.cobertura,
                               actual = tpre.actual, 
                               numeroVersion = tpre.numeroVersion,
                               fecha_actualizacion = tpre.fecha_actualizacion,
                               fecha_creacion = tpre.fecha_creacion,
                               Anio = tpre.Anio,
                               idPrograma = tpre.idPrograma

                           };
                if (data.Any())
                {
                    retorno.presupuestoAnioData = data.ToList();

                }
            }

            return retorno;
        }

        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoAnioData request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {


                var nuevo = new DbPresupuestoAnio()
                {
                    actual = true,
                    fecha_creacion = DateTime.Now,
                    fecha_actualizacion = DateTime.Now,

                    idPrograma = request.idPrograma,
                    numeroVersion  = 1,
                    Anio  = request.Anio,
                  

                };
                db.TbPresupuestoAnio.Add(nuevo);
                db.SaveChanges();
                id = nuevo.id;

              
            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }

    }
}
