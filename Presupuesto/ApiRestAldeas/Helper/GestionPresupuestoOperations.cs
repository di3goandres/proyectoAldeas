using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeasPresupuesto.EntityFrame;
using ApiRestAldeasPresupuesto.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeasPresupuesto.Helper
{
    public class GestionPresupuestoOperations
    {
        public static dynamic ConsultarPresupuestosByProgramYCeco(IContextFactory factory, IOptions<ConnectionDB> connection, CoberturaRequest request)
        {

            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var cobertura = false;
                var Actual = false;

                var tieneCobertura = from pro in db.TbProgramas
                                     join pre in db.TbPresupuestoAnio on pro.id equals pre.idPrograma
                                     join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                                     where pro.id == request.IdPrograma && pre.id == request.IdPresupuestoAnio
                                     select new {
                                         tpro.cobertura,
                                         pre.actual,
                                     };

                if (tieneCobertura.Any())
                {
                    cobertura = tieneCobertura.First().cobertura;
                    Actual = tieneCobertura.First().actual;
                }

                /// Si no es el actual no se deja actualizar o consultar.
                if (!Actual)
                {
                    return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }
                if (!cobertura)
                {

                    var existe = from pro in db.TbPresupuestos
                               join panio in db.TbPresupuestoAnio on pro.idPresupuestoAnio equals panio.id
                               where pro.idPrograma == request.IdPrograma
                               && pro.IdProgramaCecos == request.IdCeco
                               && panio.id == request.IdPresupuestoAnio

                               select pro;

                    if (!existe.Any())
                    {
                        DbPresupuesto guardar = new DbPresupuesto
                        {
                            idPrograma = request.IdPrograma,
                            idPresupuestoAnio = request.IdPresupuestoAnio,
                            IdProgramaCecos = request.IdCeco
                        };


                        PresupuestoOperations.GuardarPresupuesto(factory, connection, guardar);
                    }
                 
                }

                var data = from pre in db.TbPresupuestos
                           join finan in db.TbFinanciadores on pre.idFinanciador equals finan.id
                           where pre.idPrograma == request.IdPrograma && pre.idPresupuestoAnio == request.IdPresupuestoAnio
                                 && pre.IdProgramaCecos == request.IdCeco
                           select new ResponsePresupuesto
                           {
                               idPrograma = pre.idPrograma,
                               Anio = pre.Anio,
                               CoberturaAnual = pre.CoberturaAnual,
                               CoberturaMensual = pre.CoberturaMensual,
                               CoberturasCasas = pre.CoberturasCasas,
                               CoberturaMensualEsperada = pre.CoberturaMensualEsperada,
                               id = pre.id,
                               NombreContrato = pre.NombreContrato,
                               Financiador = finan.nombre
                           };
                if (data.Any())
                {
                    retorno.presupuesto = data.ToList();
                }
            }

            return retorno;
        }

        public static dynamic GenerarVersionamiento(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoProgramRequest request)
        {

            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var cobertura = false;
                var Actual = false;

                var tieneCobertura = from pro in db.TbProgramas
                                     join pre in db.TbPresupuestoAnio on pro.id equals pre.idPrograma
                                     join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                                     where pre.id == request.IdPresupuesto
                                     select new
                                     {
                                         tpro.cobertura,
                                         pre.actual,
                                     };

                if (tieneCobertura.Any())
                {
                    cobertura = tieneCobertura.First().cobertura;
                    Actual = tieneCobertura.First().actual;
                }

                /// Si no es el actual no se deja actualizar o consultar.
                if (!Actual)
                {
                    return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }

                //Copiamos 01 Presupuesto Anio, Copiamos  02 Presupuesto coberturas, Copiamos 03 Presupuesto Programas


               var resultado = PresupuestoAnioOperations.Copiar(factory, connection, request.IdPresupuesto);

                if (resultado == 0)
                {
                    return new JsonResult(new { message = "Versionamiento No exitoso" }) { StatusCode = StatusCodes.Status400BadRequest };

                }
                else
                {
                    return new JsonResult(new { message = "Versionamiento exitoso" }) { StatusCode = StatusCodes.Status200OK };
                }

            }

          
        }

        public static dynamic VolverVersionAnterior(IContextFactory factory, IOptions<ConnectionDB> connection, long idVersionAnterior, long idActual) 
        {
            using (Aldeas_Context db = factory.Create(connection))
            {
           
                var Anterior = from pre in db.TbPresupuestoAnio
                                     where pre.id == idVersionAnterior && pre.actual == false
                                     select pre;

                var Actual = from pre in db.TbPresupuestoAnio
                               where pre.id == idActual && pre.actual == true
                               select pre;

                if (Anterior.Any() && Actual.Any())
                {

                    Anterior.First().actual = true;
                    Anterior.First().fecha_actualizacion = DateTime.Now;

                    Actual.First().actual = false;
                    Actual.First().fecha_actualizacion = DateTime.Now;

                    db.SaveChanges();

                    return new JsonResult(new { message = "Versionamiento exitoso" }) { StatusCode = StatusCodes.Status200OK };

                }
                else
                {
                    return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }


        
    }

        public static dynamic ConsulatPresupuestoAniosPrograma(IContextFactory factory, IOptions<ConnectionDB> connection, long idPrograma, int Anio)
        {

            VersionamientoResponse retorno = new VersionamientoResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {


                var PresupuestoAnio = from tpre in db.TbPresupuestoAnio
                           join pro in db.TbProgramas on tpre.idPrograma equals pro.id
                           join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                           where tpre.actual == true && pro.id == idPrograma && tpre.Anio == Anio
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
                //var PresupuestoAnio = from pre in db.TbPresupuestoAnio
                //                      where pre.idPrograma == idPrograma
                //                      && pre.actual == true && pre.Anio == Anio
                //                      select pre;

                if (PresupuestoAnio.Any())
                {
                    retorno.Actual = PresupuestoAnio.First();
                }

                var PresupuestoAnioVersiones = from tpre in db.TbPresupuestoAnio
                                      join pro in db.TbProgramas on tpre.idPrograma equals pro.id
                                      join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                                      where tpre.actual == false && pro.id == idPrograma && tpre.Anio == Anio
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
                //var PresupuestoAnioVersiones = from pre in db.TbPresupuestoAnio
                //                      where pre.idPrograma == idPrograma
                //                      && pre.actual == false && pre.Anio == Anio
                //                      select pre;

                if (PresupuestoAnioVersiones.Any())
                {
                    retorno.Versiones = PresupuestoAnioVersiones.ToList();
                }
            

            }

            return retorno;
        }

        public static dynamic ConsultarAnios(IContextFactory factory, IOptions<ConnectionDB> connection, long idPrograma)
        {

            VersionamientoAnioResponse retorno = new VersionamientoAnioResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {


                var PresupuestoAnio = from pre in db.TbPresupuestoAnio
                                      where pre.idPrograma == idPrograma
                                      
                                      select pre.Anio;

                if (PresupuestoAnio.Any())
                {
                    retorno.Anios = PresupuestoAnio.Distinct().ToList();
                }

            }

            return retorno;
        }

    }

}
