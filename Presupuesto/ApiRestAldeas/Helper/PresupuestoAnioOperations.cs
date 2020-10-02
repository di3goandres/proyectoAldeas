﻿using ApiRestAldeas.EntityFrame;
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


                var data = from pro in db.TbPresupuestos
                           where pro.idPrograma == request.idPrograma && pro.Anio == request.Anio

                           select pro;
                if (data.Any())
                {
                    return new { id = 0, status = "Error", code = 200, message = "ya existe" };
                }
                else
                {
                    var nuevo = new DbPresupuestoAnio()
                    {
                        actual = true,
                        fecha_creacion = DateTime.Now,
                        fecha_actualizacion = DateTime.Now,

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


        public static dynamic ConsultarPresupuestoAnio(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pre in db.TbPresupuestos
                           join ceco in db.TbProgramasCecos on pre.idCeco equals ceco.id
                           join pro in db.TbProgramas on ceco.idPrograma equals pro.id
                           join finan in db.TbFinanciadores on ceco.idFinanciador equals finan.id
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
                               NombreCodigoCeco = ceco.Nombre,
                               CodigoCeco = ceco.CodigoCeco,
                               NombreSubCeco = ceco.NombreSubCentro,
                               SubCeco = ceco.SubCentro,
                               NombrePrograma = pro.Nombre

                           };
                if (data.Any())
                {
                    retorno.presupuesto = data.ToList();
                }
                var programa = from pro in db.TbProgramas
                               join pre in db.TbPresupuestos on pro.id equals pre.idPrograma
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
                                        id = pre.idCeco,
                                        pre.idPrograma
                                    };
                if (dataAgregados.Any())
                {

                    var dataCecos = from ceco in db.TbProgramasCecos
                                    join pro in db.TbProgramas on ceco.idPrograma equals pro.id
                                    join finan in db.TbFinanciadores on ceco.idFinanciador equals finan.id
                                    where !dataAgregados.Any(d => d.id == ceco.id)
                                    && dataAgregados.Any(d => d.idPrograma == pro.id)

                                    select new ProgramCeco
                                    {
                                        Estado = ceco.Estado,
                                        IdPrograma = ceco.idPrograma,
                                        CodigoCeco = ceco.CodigoCeco,
                                        Nombre = ceco.Nombre,
                                        SubCentro = ceco.SubCentro,
                                        NombreSubCentro = ceco.NombreSubCentro,
                                        Id = ceco.id,
                                        FacilityNav = ceco.FacilityNav,
                                        IdFinanciador = finan.id,
                                        NombreFinanciador = finan.nombre
                                    };



                    retorno.Cecos = dataCecos.ToList();
                }
                else
                {
                    var data = from tpre in db.TbPresupuestoAnio
                               where tpre.id == id
                               select new
                               {
                                   tpre.idPrograma
                               };


                    var dataCecos = from ceco in db.TbProgramasCecos
                                    join finan in db.TbFinanciadores on ceco.idFinanciador equals finan.id
                                    where data.Any(d => d.idPrograma == ceco.idPrograma)
                                    select new ProgramCeco
                                    {
                                        Estado = ceco.Estado,
                                        IdPrograma = ceco.idPrograma,
                                        CodigoCeco = ceco.CodigoCeco,
                                        Nombre = ceco.Nombre,
                                        SubCentro = ceco.SubCentro,
                                        NombreSubCentro = ceco.NombreSubCentro,
                                        Id = ceco.id,
                                        FacilityNav = ceco.FacilityNav,
                                        IdFinanciador = finan.id,
                                        NombreFinanciador = finan.nombre
                                    };

                    retorno.Cecos = dataCecos.ToList();

                }
            }

            return retorno;
        }
    }
}
