﻿using System;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Models;
using Microsoft.Extensions.Options;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Helper
{
    public class ColaboradoresOperations
    {
        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection,
            ColaboradorRequest request)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevo = new TbColaborador()
                {
                    Nombre = request.Nombre,
                    FechaNacimiento = request.Fecha,
                    Cargo = request.Cargo,
                    Tiempo = request.Tiempo,
                    TipoContrato = request.TipoContrato,
                    FechaInicio = request.FechaInicio,
                    FechaFin = request.FechaFin,
                    CostoMensual = request.CostoMensual,
                    Porcentaje= request.Porcentaje,
                    Contrapartida = request.Contrapartida,
                    Aporte = request.Aporte


                };
                db.TbColaboradors.Add(nuevo);
               
                db.SaveChanges();
                idProyecto = nuevo.Id;




            }
            return new { status = idProyecto == 0 ? "error" : "OK", code = 200 };
        }


    }
}
