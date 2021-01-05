﻿using ApiRestAldeas.EntityFrame;
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
    }
}
