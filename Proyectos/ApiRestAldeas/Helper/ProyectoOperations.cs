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
            ProyectoResponse retorno = new ProyectoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           select new Item
                           {
                               Codigo = pro.id,
                               Nombre = pro.nombre
                           };

                retorno.ItemsProyectos = ( data.ToList());
            


            }
            return retorno;
        }

        public static dynamic Guardar(IContextFactory factory, IOptions<ConnectionDB> connection,
            ProyectoRequest proyectoRequest)
        {
            long idProyecto = 0;
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
                    comite_tecnico = proyectoRequest.ComiteTecnico,
                    Nombrearchivo = null,
                    archivo = null
                    
                };
                db.tbProyectos.Add(nuevoProyecto);
                db.SaveChanges();
                idProyecto = nuevoProyecto.id;
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

                foreach (var item in proyectoRequest.FechasInformes)
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


                /**
                * Pantalla 2
                */
                ///Fechas de visita
                ///agregar responsable y lugar
                ///agregar ejecucion y base de datos
                var info = proyectoRequest.InfoFinanciera;
                var inforFinanciera = new InformacionFinanciera()
                {
                    id_proyecto = nuevoProyecto.id,
                    costoTotal = info.CostoTotal,
                    cuenta = info.Cuenta,
                    fuente = info.FuentePresupuesto,
                    tipoFuente = info.TipoFuente,
                    monedaDonacion = info.MonedaDonacion,
                    tasacambio = info.TasaCambio,
                    navision = info.NavisionFacilitiy,
                    plataContrapartida = info.PlatContrapartida,
                    plataDonante = info.PlataDonante,
                    responsable = info.Responsable,
                    lugar = info.Lugar

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
                foreach (var item in info.Visitas)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = item.Fecha,
                        tipo_fecha = "VISITAS"
                    });
                }


                db.tbFechaEntregas.AddRange(fechas);

                db.SaveChanges();


                var infoEjecucion = proyectoRequest.ListaEjecucion;
                List<TbEjecucion> ejecucions = new List<TbEjecucion>();

                if (infoEjecucion.Count > 0)
                {
                    foreach (var item in infoEjecucion)
                    {
                        ejecucions.Add(new TbEjecucion()
                        {
                            IdFinanciera = inforFinanciera.id,
                            Nombre = item.Nombre,
                            Enero = item.Enero,
                            Febrero = item.Febrero,
                            Marzo = item.Marzo,
                            Abril = item.Abril,
                            Mayo = item.Mayo,
                            Junio = item.Junio,
                            Julio = item.Julio,
                            Agosto = item.Agosto,
                            Sept = item.Sept,
                            Octubre = item.Octubre,
                            Noviembre = item.Noviembre,
                            Diciembre = item.Diciembre
                        });
                    }

                    db.tbEjecucion.AddRange(ejecucions);
                }

                var infoCentroCostos = proyectoRequest.InfoFinanciera.ListCentroCostos;
                List<ColaboradorInforFinanciera> listaCentroCostos = new List<ColaboradorInforFinanciera>();
                foreach (var item in infoCentroCostos)
                {
                    listaCentroCostos.Add(new ColaboradorInforFinanciera()
                    {
                        Codigo = item.Name,
                        id_SubCentroCosto = item.Codigo,
                        id_InfoFinanciera = inforFinanciera.id,
                        id_Colaboradores = null
                    });
                }
                db.TbCICentroCostos.AddRange(listaCentroCostos);
                db.SaveChanges();


                ///
                /**
                 * Pantalla 3 Participantes
                 * tabla Partipantes con tipo
                 * total familias /Observaciones
                 * Lista de otros Participantes
                 */
                var infoParticipantes = proyectoRequest.ParticiProyectados;



                var dataPart = new DBParticipantesProyectados();
                dataPart.id_proyecto = idProyecto;
                dataPart.TotalFamilias = infoParticipantes.TotalFamilias;
                dataPart.Observaciones = infoParticipantes.Observaciones;

                db.tbParticipantesProyectados.Add(dataPart);
                db.SaveChanges();
                List<DBParticipantes> listParticipantes = new List<DBParticipantes>();

                foreach (var item in infoParticipantes.ListaParticipantes)
                {
                    listParticipantes.Add(new DBParticipantes()
                    {
                        id_participantes = dataPart.id,
                        Nombre = item.Nombre,
                        Rango_0_5 = item.Rango_0_5,
                        Rango_6_12 = item.Rango_6_12,
                        Rango_13_17 = item.Rango_13_17,
                        Rango_18_24 = item.Rango_18_24,
                        Rango_25_56 = item.Rango_25_56,
                        Mayores_60 = item.Mayores_60,
                        Total = item.Total,
                        TotalDesagregado = item.TotalDesagregado,
                        Porcentaje = item.Porcentaje
                    });
                }


                if (infoParticipantes.OtrosParticipantes.Count > 0)
                {
                    foreach (var item in infoParticipantes.OtrosParticipantes)
                    {
                        listParticipantes.Add(new DBParticipantes()
                        {
                            id_participantes = dataPart.id,
                            Nombre = item.Nombre,
                            Rango_0_5 = 0,
                            Rango_6_12 = 0,
                            Rango_13_17 = 0,
                            Rango_18_24 = 0,
                            Rango_25_56 = 0,
                            Mayores_60 = 0,
                            Total = item.Total,
                            Porcentaje = item.Porcentaje

                        });
                    }

                }
                db.tbParticipantes.AddRange(listParticipantes);
                db.SaveChanges();
            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = 200 };
        }

        public static dynamic GuardarArchivo(IContextFactory factory, IOptions<ConnectionDB> connection,
          long idProyecto, byte[] file, string tipo)
        {
            using (Aldeas_Context db = factory.Create(connection))
            {

                var proyectoActualizar = from pro in db.tbProyectos
                           where pro.id == idProyecto
                           select pro;


                if (proyectoActualizar.Any())
                {
                    proyectoActualizar.First().Nombrearchivo = tipo;
                    proyectoActualizar.First().archivo = file;

                    db.SaveChanges();

                }





            }
            return new { id = idProyecto, status =  "OK", code = 200 };
        }


        public static dynamic ConsultarParticipantes(IContextFactory factory, IOptions<ConnectionDB> connection,
           long idProyecto)
        {

            RegistroParticipantesProyectosResponse retorno = new RegistroParticipantesProyectosResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var ParticipantesRegistrados = from participantes in db.tbRegistroParticipantes
                                               where participantes.idProyecto == idProyecto
                                               select participantes;


                if(ParticipantesRegistrados.Any())
                {
                    retorno.Registros = (ParticipantesRegistrados.ToList());
                }

            }
            return retorno;
        }

    }
}
