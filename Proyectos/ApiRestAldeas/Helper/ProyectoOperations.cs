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
using System.IO;

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

        /// <summary>
        /// Metodo para consultar los proyctos para mostrar en listas
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="connection"></param>
        /// <returns></returns>ConsultarProyectoListasExport
        public static dynamic ConsultarProyectoListasExport(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            ProyectoListaResponse retorno = new ProyectoListaResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           select new ProyectosSinArchivo
                           {
                               id = pro.id,
                               nombre = pro.nombre,
                               status = pro.status,
                               donante = pro.donante,
                               tipo_financiacion = pro.tipo_financiacion,
                               nombre_donante = pro.nombre_donante,
                               direccion = pro.direccion,
                               email = pro.email,
                               fecha_inicio = pro.fecha_inicio,
                               fecha_finalizacion = pro.fecha_finalizacion,
                               lider_ejecucion = pro.lider_ejecucion,
                               lider_coordinacion = pro.lider_coordinacion,
                               tipo_implementacion = pro.tipo_implementacion,
                               comite_tecnico = pro.comite_tecnico,
                               requiereLiquidacion = pro.requiereLiquidacion,
                               telefono = pro.telefono



                           };
                retorno.ItemsProyectos = (data.ToList());
            }
            return retorno;
        }


        public static dynamic ConsultarProyectoListas(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            ProyectoListaResponse retorno = new ProyectoListaResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           select new ProyectosSinArchivo
                           {
                               id = pro.id,
                               nombre = pro.nombre,
                               status = pro.status,
                               donante = pro.donante,
                               tipo_financiacion = pro.tipo_financiacion,
                               nombre_donante = pro.nombre_donante,
                               direccion = pro.direccion,
                               email = pro.email,
                               fecha_inicio = pro.fecha_inicio,
                               fecha_finalizacion = pro.fecha_finalizacion,
                               lider_ejecucion = pro.lider_ejecucion,
                               lider_coordinacion = pro.lider_coordinacion,
                               tipo_implementacion = pro.tipo_implementacion,
                               comite_tecnico = pro.comite_tecnico,
                               requiereLiquidacion = pro.requiereLiquidacion,
                               telefono = pro.telefono


                           };
                retorno.ItemsProyectos = (data.ToList());
            }
            return retorno;
        }


        public static dynamic ConsultarProyectobyID(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            ProyectoUnicoResponse retorno = new ProyectoUnicoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.tbProyectos
                           where pro.id == id
                           select pro ;
                if (data.Any())
                {
                    long idProyecto = 0;
                    retorno.ItemProyecto = data.First();

                    idProyecto = retorno.ItemProyecto.id;
                    var financiaera = from finacie in db.tbInformacionFinanciera
                               where finacie.id_proyecto == idProyecto
                                      select finacie;

                    long idFinanciera = 0;
                    if (financiaera.Any())
                    {

                        retorno.ItemFinanciera = financiaera.First();
                        idFinanciera = retorno.ItemFinanciera.id;
                    }

                    var dataFechas = from fechas in db.tbFechaEntregas
                                      where fechas.id_proyecto == idProyecto
                                      select fechas;

                    if (dataFechas.Any())
                    {
                        retorno.ItemsFechas = dataFechas.ToList();
                    }

                    var dataMunicipios = from munipro in db.tbMunicipioProyectos
                                         join muni in db.tbMunicipios  on munipro.id_municipio equals muni.id
                                         join depar in db.tbDepartamentos on muni.cod_dane_departamento equals depar.id_departamento
                                     where munipro.id_proyecto == idProyecto
                                     select new ProyectoMunicipioResponse {

                                            id = munipro.id,
                                            id_proyecto = munipro.id_proyecto,
                                            id_departamento = depar.id_departamento,
                                            departamento = depar.departamento,
                                            id_municipio = muni.id,
                                            municipio = muni.municipio

                                     };

                    if (dataMunicipios.Any())
                    {
                        retorno.ItemsMunicipios = dataMunicipios.ToList();
                    }

                    var dataCentros = from centros in db.TbCICentroCostos
                                      where centros.id_InfoFinanciera == idFinanciera
                                      select centros;

                    if (dataCentros.Any())
                    {
                        retorno.ItemsCentroCostos = dataCentros.ToList();
                    }
                    var dataEjecucion = from ejecu in db.tbEjecucion
                                         where ejecu.IdFinanciera == idFinanciera
                                        select ejecu;

                    if (dataEjecucion.Any())
                    {
                        retorno.ItemsEjecucion = dataEjecucion.ToList();
                    }

                    var Proyectado = from proyectado in db.tbParticipantesProyectados
                                     where proyectado.id_proyecto == idProyecto
                                     select proyectado;

                    if (Proyectado.Any())
                    {

                        retorno.ItemProyectados = new ProyectadosResponse();
                        retorno.ItemProyectados.id = Proyectado.First().id;
                        retorno.ItemProyectados.TotalFamilias = Proyectado.First().TotalFamilias;
                        retorno.ItemProyectados.Observaciones = Proyectado.First().Observaciones;

                        var Participantes = from participante in db.tbParticipantes
                                            where participante.id_participantes == retorno.ItemProyectados.id
                                            select participante;

                        if (Participantes.Any())
                        {
                            retorno.ItemProyectados.ListParticipantes = Participantes.ToList();

                        }

                    }
                }
             
            }
            return retorno;
        }

        public static dynamic ConsultarCecosProyectobyID(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            ProyectoCecoResponse retorno = new ProyectoCecoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                long idFinanciera = 0;
                var financiaera = from finacie in db.tbInformacionFinanciera
                                  where finacie.id_proyecto == id
                                  select finacie;
                if (financiaera.Any())
                {
                    var dataCentros = from centros in db.TbCICentroCostos
                                      where centros.id_InfoFinanciera == idFinanciera
                                      select centros;
                    if (dataCentros.Any())
                    {
                        retorno.ItemsCentroCostos = dataCentros.ToList();
                    }
                }
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
                    fecha_inicio = Utils.CambiarFecha(proyectoRequest.FechaInicio),
                    fecha_finalizacion = Utils.CambiarFecha( proyectoRequest.FechaFinalizacion),
                    lider_ejecucion = proyectoRequest.LiderEjecucion,
                    lider_coordinacion = proyectoRequest.LiderCoordinacion,
                    comite_tecnico = proyectoRequest.ComiteTecnico,
                    tipo_implementacion = proyectoRequest.TipoImplementacion,
                    telefono = proyectoRequest.Telefono,
                    Nombrearchivo = null,
                    requiereLiquidacion = proyectoRequest.Requiere.ToUpper() =="TRUE" ? true:false,
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
                        fecha = Utils.CambiarFecha(item.Fecha),
                        tipo_fecha = "COMITES"
                    });
                }

                foreach (var item in proyectoRequest.FechasInformes)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = Utils.CambiarFecha(item.Fecha),
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
                        fecha = Utils.CambiarFecha(item.Fecha),
                        tipo_fecha = "FECHAS DESEMBOLSO"
                    });
                }
                foreach (var item in info.Visitas)
                {
                    fechas.Add(new FechasEntregas()
                    {
                        id_proyecto = nuevoProyecto.id,
                        fecha = Utils.CambiarFecha(item.Fecha),
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


        public static dynamic ActualizarItemProyecto(IContextFactory factory, IOptions<ConnectionDB> connection,
        ItemProyectoRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                var registro = from dato in db.tbProyectos
                               where dato.id == proyectoRequest.ItemProyecto.id
                               select dato;
                if (registro.Any())
                {

                    idProyecto = proyectoRequest.ItemProyecto.id;
                    registro.First().nombre = proyectoRequest.ItemProyecto.nombre;
                    registro.First().status = proyectoRequest.ItemProyecto.status;
                    registro.First().donante = proyectoRequest.ItemProyecto.donante;
                    registro.First().fecha_inicio = Utils.CambiarFecha(proyectoRequest.ItemProyecto.fecha_inicio);
                    registro.First().fecha_finalizacion = Utils.CambiarFecha(proyectoRequest.ItemProyecto.fecha_finalizacion);
                    registro.First().requiereLiquidacion = proyectoRequest.ItemProyecto.requiereLiquidacion;
                    registro.First().tipo_implementacion = proyectoRequest.ItemProyecto.tipo_implementacion;
                    registro.First().tipo_financiacion = proyectoRequest.ItemProyecto.tipo_financiacion;
                    registro.First().nombre_donante = proyectoRequest.ItemProyecto.nombre_donante;
                    registro.First().direccion = proyectoRequest.ItemProyecto.direccion;
                    registro.First().email = proyectoRequest.ItemProyecto.email;
                    registro.First().lider_ejecucion = proyectoRequest.ItemProyecto.lider_ejecucion;
                    registro.First().telefono = proyectoRequest.ItemProyecto.telefono;
                    registro.First().lider_coordinacion = proyectoRequest.ItemProyecto.lider_coordinacion;
                    registro.First().comite_tecnico = proyectoRequest.ItemProyecto.comite_tecnico;
                    db.SaveChanges();

                }
           
            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300:200 };
        }


        public static dynamic ActualizarItemInfoFinanciera(IContextFactory factory, IOptions<ConnectionDB> connection,
      InformacionFinancieraRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                var registro = from dato in db.tbInformacionFinanciera
                               where dato.id == proyectoRequest.ItemFinanciera.id
                               select dato;
                if (registro.Any())
                {

                    idProyecto = proyectoRequest.ItemFinanciera.id;
                    registro.First().costoTotal = proyectoRequest.ItemFinanciera.costoTotal;
                    registro.First().fuente = proyectoRequest.ItemFinanciera.fuente;
                    registro.First().plataContrapartida = proyectoRequest.ItemFinanciera.plataContrapartida;
                    registro.First().tipoFuente = proyectoRequest.ItemFinanciera.tipoFuente;
                    registro.First().plataDonante = proyectoRequest.ItemFinanciera.plataDonante;
                    registro.First().monedaDonacion = proyectoRequest.ItemFinanciera.monedaDonacion;
                    registro.First().tasacambio = proyectoRequest.ItemFinanciera.tasacambio;
                    registro.First().cuenta = proyectoRequest.ItemFinanciera.cuenta;
                    registro.First().navision = proyectoRequest.ItemFinanciera.navision;
                    registro.First().responsable = proyectoRequest.ItemFinanciera.responsable;
                    registro.First().lugar = proyectoRequest.ItemFinanciera.lugar;

                    db.SaveChanges();

                }

            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300 : 200 };
        }


        public static dynamic ActualizarItemFechas(IContextFactory factory, IOptions<ConnectionDB> connection,FechasEntregasRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                var registro = from dato in db.tbFechaEntregas
                               where dato.id == proyectoRequest.ItemsFechas.id
                               select dato;
                if (registro.Any())
                {

                    idProyecto = proyectoRequest.ItemsFechas.id;
                    registro.First().fecha =Utils.CambiarFecha( proyectoRequest.ItemsFechas.fecha);
                   
                    db.SaveChanges();

                }

            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300 : 200 };
        }


        public static dynamic ActualizarItemParticipanteObservaciones(IContextFactory factory, IOptions<ConnectionDB> connection,
            ProyectadosRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {



                var registro = from dato in db.tbParticipantesProyectados
                               where dato.id == proyectoRequest.ItemProyectados.id
                               select dato;
                if (registro.Any())
                {

                    idProyecto = proyectoRequest.ItemProyectados.id;
                    registro.First().TotalFamilias = proyectoRequest.ItemProyectados.TotalFamilias;
                    registro.First().Observaciones = proyectoRequest.ItemProyectados.Observaciones;
                    db.SaveChanges();

                }

            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300 : 200 };
        }


        public static dynamic ActualizarItemParticipanteLIST(IContextFactory factory, IOptions<ConnectionDB> connection,
           ProyectadosRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {




                foreach(var info in proyectoRequest.ItemProyectados.ListParticipantes)
                {
                    var registro = from dato in db.tbParticipantes
                                   where dato.id == info.id
                                   select dato;
                    if (registro.Any())
                    {

                        idProyecto = info.id;
                        registro.First().Rango_0_5 = info.Rango_0_5;
                        registro.First().Rango_6_12 = info.Rango_6_12;                 
                        registro.First().Rango_13_17 = info.Rango_13_17;
                        registro.First().Rango_18_24 = info.Rango_18_24;
                        registro.First().Rango_25_56 = info.Rango_25_56;
                        registro.First().Mayores_60 = info.Mayores_60;
                        registro.First().Total = info.Total;
                        registro.First().TotalDesagregado = info.TotalDesagregado;
                        db.SaveChanges();

                    }
                }
               

            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300 : 200 };
        }


        public static dynamic ActualizarItemMunicipio(IContextFactory factory, IOptions<ConnectionDB> connection,
         MunicipioRequest proyectoRequest)
        {
            long idProyecto = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                    var registro = from dato in db.tbMunicipioProyectos
                                   where dato.id == proyectoRequest.ItemsMunicipios.id
                                   select dato;
                    if (registro.Any())
                    {
                       idProyecto = proyectoRequest.ItemsMunicipios.id;
                        registro.First().id_departamento = proyectoRequest.ItemsMunicipios.id_departamento;
                        registro.First().id_municipio = proyectoRequest.ItemsMunicipios.id_municipio;
                        db.SaveChanges();

                    }
                
            }
            return new { id = idProyecto, status = idProyecto == 0 ? "error" : "OK", code = idProyecto == 0 ? 300 : 200 };
        }

        public static dynamic GuardarArchivo(IContextFactory factory, IOptions<ConnectionDB> connection,
          long idProyecto, byte[] file, string nombre, string tipo)
        {
            using (Aldeas_Context db = factory.Create(connection))
            {

                var proyectoActualizar = from pro in db.tbProyectos
                           where pro.id == idProyecto
                           select pro;


                if (proyectoActualizar.Any())
                {
                    proyectoActualizar.First().tipoArchivo = tipo;
                    proyectoActualizar.First().Nombrearchivo = nombre;
                    proyectoActualizar.First().archivo = file;
                    db.SaveChanges();

                }





            }
            return new { id = idProyecto, status =  "OK", code = 200 };
        }



        public static dynamic ConsultarArchivo(IContextFactory factory, IOptions<ConnectionDB> connection,
       long idProyecto)
        {
            ArchivoResponse retorno = new ArchivoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {

                var data = from pro in db.tbProyectos
                                         where pro.id == idProyecto
                                         select pro;


                var directorio = "ProyectosFiles/" + idProyecto + "/";

                if (!Directory.Exists(directorio))
                {
                    DirectoryInfo di = Directory.CreateDirectory(directorio);
                }

            

                if (data.Any())
                {
                   
                    retorno.Idproyecto = data.First().id;
                    retorno.TipoArchivo = data.First().tipoArchivo; ;
                    retorno.NombreArchivo = data.First().Nombrearchivo;

                    if (!File.Exists(directorio + retorno.NombreArchivo))
                    {
                        try
                        {
                            using (var fs = new FileStream(directorio + retorno.NombreArchivo, FileMode.Create, FileAccess.Write))
                            {
                                fs.Write(data.First().archivo, 0, data.First().archivo.Length);
                               
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Exception caught in process: {0}", ex);
                            
                        }
                    }

                }


            }
            return retorno;
        }

        public static dynamic ConsultarParticipantes(IContextFactory factory, IOptions<ConnectionDB> connection,
           long idProyecto)
        {

            RegistroParticipantesProyectosResponse retorno = new RegistroParticipantesProyectosResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var ParticipantesRegistrados = from dato in db.tbRegistroParticipantes
                                               join muni in db.tbMunicipios on dato.idMunicipio equals  muni.id
                                               join dep in db.tbDepartamentos on muni.cod_dane_departamento equals dep.id_departamento

                                               where dato.idProyecto == idProyecto
                                               select new RegistroParticipanteResponse
                                               {
                                                    id = dato.id,
                                                    idProyecto = dato.idProyecto,
                                                    idMunicipio = dato.idMunicipio,
                                                    Municipio = muni.municipio,
                                                    Departamento = dep.departamento,
                                                    Nombres = dato.Nombres,
                                                    Apellidos = dato.Apellidos,
                                                    FechaNacimiento =dato.FechaNacimiento,
                                                 
                                                    Edad = dato.Edad,
                                                    FechaIngreso = dato.FechaIngreso,
                                                    FechaSalida = dato.FechaSalida,
                                                    Localidad = dato.Localidad,
                                                    Sexo = dato.Sexo,
                                                    EstatusResidencia = dato.EstatusResidencia,
                                                    UltimoCursoAprobado = dato.UltimoCursoAprobado,
                                                    AsisteAlColegio = dato.AsisteAlColegio,
                                                    GrupoPoblacional = dato.GrupoPoblacional,
                                                    GrupoEtnico = dato.GrupoEtnico,
                                                    Nacionalidad = dato.Nacionalidad,
                                                    Genero = dato.Genero,
                                                    TipoParticipante = dato.TipoParticipante,
                                                    Discapacidad = dato.Discapacidad,
                                                    NivelEscolaridad = dato.NivelEscolaridad

                                               };


                if(ParticipantesRegistrados.Any())
                {
                    retorno.Registros = (ParticipantesRegistrados.ToList());
                }

            }
            return retorno;
        }



    }
}
