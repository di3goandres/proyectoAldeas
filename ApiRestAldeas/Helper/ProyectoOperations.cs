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
    public class ProyectoOperations
    {
       public static dynamic ConsultarProyecto(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           select pro;

                var proyectos = JsonConvert.SerializeObject(data);
                return proyectos;
              

            }
        }

        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection,
            ProyectoRequest proyectoRequest)
        {
            using (Aldeas_Context db = factory.Create(connection))
            {
                var nuevoProyecto = new Proyectos()
                {
                    nombre = proyectoRequest.Nombre,
                    status = proyectoRequest.Status,
                    donante = proyectoRequest.Donante,
                    tipo_financiacion = proyectoRequest.TipoFinanciacion,
                    nombre_donante = proyectoRequest.NombreDonante,
                    direccion = proyectoRequest.Direccion,
                    email = proyectoRequest.Email,
                    fecha_inicio = proyectoRequest.FechaInicio,
                    fecha_finalizacion = proyectoRequest.FechaFinalizacion,
                    lider_ejecucion = proyectoRequest.LiderEjecucion,
                    lider_coordinacion = proyectoRequest.LiderCoordinacion,
                    comite_tecnico = proyectoRequest.ComiteTecnico
                };
                db.tbProyectos.Add(nuevoProyecto);
                db.SaveChanges();

                List<FechasEntregas> fechas = new List<FechasEntregas>();
               

                foreach (var item in proyectoRequest.FechasComites)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = item.Fecha,
                        tipo_fecha = "COMITES"
                    });
                }

                foreach (var item in proyectoRequest.FechasComites)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = item.Fecha,
                        tipo_fecha = "INFORMES"
                    });
                }


                List<MunicipioProyectos> municipios = new List<MunicipioProyectos>();

                foreach (var item in proyectoRequest.Municipio)
                {
                    municipios.Add(new MunicipioProyectos()
                    {
                        id_proyecto = nuevoProyecto.id,
                        id_departamento = item.CodigoDepartamento,
                        id_municipio = item.CodigoMunicipio
                    });
                }
                db.tbMunicipioProyectos.AddRange(municipios);

                var info = proyectoRequest.InfoFinanciera;
                var inforFinanciera = new InformacionFinanciera()
                {
                    id_proyecto = nuevoProyecto.id,
                    costoTotal = long.Parse( info.CostoTotal),
                    cuenta = info.Cuenta,
                    fuente = info.FuentePresupuesto,
                    tipoFuente = info.TipoFuente,
                    monedaDonacion = info.MonedaDonacion,
                    tasacambio = info.TasaCambio,
                    navision = info.NavisionFacilitiy,
                    idSubCentroCostos = info.SubCentro

                };
                db.tbInformacionFinanciera.Add(inforFinanciera);
                foreach (var item in info.Desembolsos)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = item.Fecha,
                        tipo_fecha = "FECHAS DESEMBOLSO"
                    });
                }
                db.tbFechaEntregas.AddRange(fechas);

                db.SaveChanges();








            }
            return true;
        }
    }
}
