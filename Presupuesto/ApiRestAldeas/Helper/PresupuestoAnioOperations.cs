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
                           where tpre.actual == true && pro.id == idPrograma
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
                               idPrograma = tpre.idPrograma,
                               per_capacitacion = tpre.per_capacitacion,
                               per_nomina = tpre.per_nomina,



                           };
                if (data.Any())
                {
                    retorno.presupuestoAnioData = data.ToList();

                }
                else
                {
                    retorno.presupuestoAnioData = new List<PresupuestoAnioData>();

                }

                var dataPrograma = from pro in db.TbProgramas
                                  where pro.id == idPrograma
                                  select pro;

                if (dataPrograma.Any())
                {
                    retorno.idPrograma = dataPrograma.First().id;
                    retorno.NombrePrograma = dataPrograma.First().Nombre;

                }

            }

            return retorno;
        }

        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoAnioData request)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {


                var data = from pro in db.TbPresupuestos
                           where pro.idPrograma == request.idPrograma && pro.Anio == request.Anio

                           select pro;
                if (data.Any())
                {
                    return new { id = 0, status = "Error", code = 200, message = "ya existe" };
                }
                else
                {

                    var programa = from pro in db.TbProgramas
                                   where pro.id == request.idPrograma

                                   select pro;

                    if (!programa.Any())
                    {
                        return new { id = 0, status = "Error", code = 200, message = "Error" };
                    }
                    var nuevo = new DbPresupuestoAnio()
                    {
                        actual = true,
                        fecha_creacion = DateTime.Now,
                        fecha_actualizacion = DateTime.Now,
                        per_capacitacion = programa.First().per_capacitacion,
                        per_nomina = programa.First().per_capacitacion,
                        idPrograma = request.idPrograma,
                        numeroVersion = 1,
                        Anio = request.Anio,


                    };
                    db.TbPresupuestoAnio.Add(nuevo);
                    db.SaveChanges();
                    id = nuevo.id;
                }



            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }


        public static dynamic Borrar(IContextFactory factory, IOptions<ConnectionDB> connection, long Id)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {

                id = Id;
                var data = from pro in db.TbPresupuestosProgramas
                           where pro.id == Id

                           select pro;
                if (data.Any())
                {
                    db.TbPresupuestosProgramas.Remove(data.First());
                    db.SaveChanges();
                }

            }
            return new { id = id, status = id == 0 ? "error" : "OK", code = 200 };
        }



        public static dynamic ConsultarPresupuestoAnio(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pre in db.TbPresupuestos
                           join pro in db.TbProgramas on pre.idPrograma equals pro.id
                           join finan in db.TbFinanciadores on pre.idFinanciador equals finan.id
                           where pre.idPresupuestoAnio == id
                           select new ResponsePresupuesto
                           {
                               idPrograma = pre.idPrograma,
                               Anio = pre.Anio,
                               CoberturaAnual = pre.CoberturaAnual,
                               CoberturaMensual = pre.CoberturaMensual,
                               CoberturasCasas = pre.CoberturasCasas,
                               CoberturaMensualEsperada = pre.CoberturaMensualEsperada,
                               id = pre.id,
                               Financiador = finan.nombre,
                               NombrePrograma = pro.Nombre


                           };
                if (data.Any())
                {
                    retorno.presupuesto = data.ToList();
                }
                else
                {
                    retorno.presupuesto = new List<ResponsePresupuesto>();
                }
                var programa = from pro in db.TbProgramas
                               join pre in db.TbPresupuestoAnio on pro.id equals pre.idPrograma
                               join Tprograma in db.TbTipoPrograma on pro.id_tipo_programa equals Tprograma.id
                               where pre.id == id
                               select new Program
                               {
                                   Cobertura = Tprograma.cobertura,
                                   Id = pro.id,
                                   Estado = pro.Estado,
                                   Nombre = pro.Nombre,
                                   TipoProgramaNombre = Tprograma.nombre,
                                   IdTipoPrograma = pro.id_tipo_programa,
                                   PerCapacitacion = pro.per_capacitacion,
                                   PerNomina = pro.per_nomina
                               };
                if (programa.Any())
                {
                    retorno.programa = programa.First();
                }
                


            }

            return retorno;
        }

        public static dynamic ConsultarFinanciadorFaltante(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            FinanciadoresResponse retorno = new FinanciadoresResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var dataAgregados = from pre in db.TbPresupuestos
                                    where pre.idPresupuestoAnio == id
                                    select new
                                    {
                                        id = pre.idFinanciador,
                                        pre.idPrograma
                                    };
                if (dataAgregados.Any())
                {

                    var datafinanciadores = from programa in db.TbProgramas
                                            join cecos in db.TbProgramasCecos on programa.id equals cecos.idPrograma

                                            join finan in db.TbFinanciadores on cecos.idFinanciador equals finan.id

                                            where !dataAgregados.Any(d => d.id == finan.id)
                                            && dataAgregados.Any(d => d.idPrograma == programa.id)


                                            select new FinanciadorData
                                            {
                                                Estado = finan.activo,
                                                Nombre = finan.nombre,
                                                Id = finan.id,
                                                FechaCreacion = finan.fecha_creacion,
                                                FechaActualizacion = finan.fecha_actualizacion

                                            };



                    retorno.financiadoresData = datafinanciadores.Distinct().ToList();
                }
                else
                {
                    var data = from pre in db.TbPresupuestoAnio
                               where pre.id == id
                               select new
                               {
                                   pre.id,
                                   pre.idPrograma
                               };


                    var datafinanciadores = from programa in db.TbProgramas
                                            join cecos in db.TbProgramasCecos on programa.id equals cecos.idPrograma
                                            join finan in db.TbFinanciadores on cecos.idFinanciador equals finan.id
                                            where data.Any(d => d.idPrograma == programa.id)
                                            select new FinanciadorData
                                            {
                                                Estado = finan.activo,
                                                Nombre = finan.nombre,
                                                Id = finan.id,
                                                FechaCreacion = finan.fecha_creacion,
                                                FechaActualizacion = finan.fecha_actualizacion

                                            };



                    retorno.financiadoresData = datafinanciadores.Distinct().ToList();


                }
            }

            return retorno;
        }
    }
}
