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

        public static long Copiar(IContextFactory factory, IOptions<ConnectionDB> connection, long  IdPresupuestoAnio)
        {
            long id = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {


                var data = from pro in db.TbPresupuestoAnio
                           where pro.id == IdPresupuestoAnio && pro.actual == true
                           select pro;



                if (data.Any())
                {
                    #region Copiamos 01 Presupuesto Anio
                    int numVersion = 0;
                    numVersion = data.First().numeroVersion+1;

                    var conteo = from pro in db.TbPresupuestoAnio
                                 where pro.idPrograma == data.First().idPrograma
                                       && pro.Anio == data.First().Anio
                                 select pro;

                    numVersion  = conteo.Count() + 1;
                    var nuevo = new DbPresupuestoAnio()
                    {
                        actual = true,
                        fecha_creacion = DateTime.Now,
                        fecha_actualizacion = DateTime.Now,
                        per_capacitacion = data.First().per_capacitacion,
                        per_nomina = data.First().per_capacitacion,
                        idPrograma = data.First().idPrograma,
                        numeroVersion = numVersion,
                        Anio = data.First().Anio,


                    };
                    db.TbPresupuestoAnio.Add(nuevo);

                    db.SaveChanges();
                    data.First().actual = false;
                    data.First().fecha_actualizacion = DateTime.Now;

                    db.SaveChanges();

                    id = nuevo.id;

                    #endregion

                    #region  Copiamos  02 Presupuesto coberturas
                    var dataCoberturas = from pro in db.TbPresupuestos
                               where pro.idPresupuestoAnio == IdPresupuestoAnio
                               select pro;



                    List<DbPresupuestoPrograma> presupuestoProgramasCopia = new List<DbPresupuestoPrograma>();
                    if (dataCoberturas.Any())
                    {
                        foreach(var copia in dataCoberturas.ToList())
                        {
                            long idCoberturaCopia = 0;
                            var coberturaCopia = new DbPresupuesto
                            {
                                Anio = copia.Anio,
                                idPresupuestoAnio = id,
                                idPrograma = copia.idPrograma,
                                idFinanciador = copia.idFinanciador,
                                IdProgramaCecos = copia.IdProgramaCecos,
                                NombreContrato = copia.NombreContrato,
                                CoberturaAnual = copia.CoberturaAnual,
                                CoberturaMensual = copia.CoberturaMensual,
                                CoberturaMensualEsperada = copia.CoberturaMensualEsperada,
                                CoberturasCasas = copia.CoberturasCasas,
                                fecha_actualizacion = DateTime.Now,
                                fecha_creacion = DateTime.Now


                            };

                            db.TbPresupuestos.Add(coberturaCopia);
                            db.SaveChanges();
                            idCoberturaCopia = coberturaCopia.id;


                            var dataItemsCobertura = from pro in db.TbPresupuestosProgramas
                                                 where pro.idPresupuesto == copia.id
                                                     select pro;

                            if (dataItemsCobertura.Any())
                            {
                                foreach(var copiaItem in dataItemsCobertura.ToList())
                                {
                                    var nuevoCopiaItem = new DbPresupuestoPrograma
                                    {

                                        idPresupuesto = idCoberturaCopia,
                                        idProgramaCecos = copiaItem.idProgramaCecos,
                                        idRubroPucs = copiaItem.idRubroPucs,
                                        esNomina = copiaItem.esNomina,
                                        esPPTO =copiaItem.esPPTO,
                                        NumeroIdentificacion = copiaItem.NumeroIdentificacion,
                                        Nombre = copiaItem.Nombre,
                                        Cargo = copiaItem.Cargo,
                                        Asignacion = copiaItem.Asignacion,
                                        NoCasa = copiaItem.NoCasa,
                                        NoKids = copiaItem.NoKids,
                                        NotaIngles = copiaItem.NotaIngles,
                                        DetalleGasto = copiaItem.DetalleGasto,
                                        Enero = copiaItem.Enero,
                                        Febrero = copiaItem.Febrero,
                                        Marzo = copiaItem.Marzo,
                                        Abril = copiaItem.Abril,
                                        Mayo = copiaItem.Mayo,
                                        Junio = copiaItem.Junio,
                                        Julio = copiaItem.Julio,
                                        Agosto = copiaItem.Agosto,
                                        Septiembre = copiaItem.Septiembre,
                                        Octubre = copiaItem.Octubre,
                                        Noviembre = copiaItem.Noviembre,
                                        Diciembre = copiaItem.Diciembre,
                                        Total = copiaItem.Total,
                                        TotalAnual = copiaItem.TotalAnual,
                                        fecha_actualizacion = DateTime.Now,
                                        fecha_creacion = DateTime.Now


                                    };
                                    presupuestoProgramasCopia.Add(nuevoCopiaItem);
                                }

                                if (presupuestoProgramasCopia.Count > 0)
                                {
                                    db.TbPresupuestosProgramas.AddRange(presupuestoProgramasCopia);
                                    db.SaveChanges();
                                    presupuestoProgramasCopia = new List<DbPresupuestoPrograma>();
                                }

                            }


                        }

                      
                    }
                    #endregion



                }
                else
                {
                    return 0;
                }
                   
            }


            return id;
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
