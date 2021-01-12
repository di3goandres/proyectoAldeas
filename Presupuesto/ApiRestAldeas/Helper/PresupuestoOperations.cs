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
    public class PresupuestoOperations
    {

        //llega el id del presupuesto
        public static dynamic ConsultarProgramas(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            PresupuestoResponse retorno = new PresupuestoResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                long idPrograma = 0;
                
                string Financiacodr = "";



                var presupuesto = from pro in db.TbPresupuestoAnio
                                
                                  where pro.id == id
                                 
                                  select new 
                                  {
                                      Id = pro.idPrograma,
                                 
                          
                                  };
                if(presupuesto.Any())
                {
                    idPrograma = presupuesto.FirstOrDefault().Id;
                 

                }
                var data = from pro in db.TbProgramas
                           where pro.Estado == true
                           && pro.id == idPrograma 
                           select new ProgramPresupuesto
                           {
                               Id = pro.id,
                               Nombre = pro.Nombre,
                               Financiador = Financiacodr
                           };
                if (data.Any())
                {
                    retorno.Programas = data.ToList();
                }
                var dataCecos = from cecos in db.TbProgramasCecos
                                where cecos.Estado == true
                                   && cecos.idPrograma == idPrograma
                                select new PresupuestoProgramCeco
                                {
                                    IdPrograma = cecos.idPrograma,
                                    CodigoCeco = cecos.CodigoCeco,
                                    Nombre = cecos.Nombre,

                                };
                if (dataCecos.Any())
                {
                    retorno.Cecos = dataCecos.Distinct().ToList();
                }

                var dataSubCecos = from cecos in db.TbProgramasCecos
                                   where cecos.Estado == true
                                       && cecos.idPrograma == idPrograma
                                   select new PresupuestoSubCeco
                                   {
                                       IdCeco = cecos.CodigoCeco,
                                       SubCentro = cecos.SubCentro,
                                       NombreSubCentro = cecos.NombreSubCentro,
                                       FacilityNav = cecos.FacilityNav,

                                       Id = cecos.id,
                                   };

                if (dataSubCecos.Any())
                {
                    retorno.PresupuestoSubCeco = dataSubCecos.ToList();
                }
                var dataCategorias = from rubro in db.TbRubros
                                     where rubro.Estado == true
                                     select new PresupuestoCategoria
                                     {
                                         Id = rubro.id,
                                         Nombre = rubro.Nombre,
                                         EsNomina = rubro.esNomina,
                                         Esppto = rubro.EsPptp
                                     };
                if (dataCategorias.Any())
                {
                    retorno.Categorias = dataCategorias.ToList();
                }
                var dataPucs = from puc in db.TbPucs
                               where puc.Estado == true
                               
                               select new PresupuestoCategoriaPuc
                               {

                                   Id = puc.id,
                                   IdCategoria = puc.idRubro,
                                   Tipo = puc.Tipo,
                                   CuentaSIIGO = puc.CuentaSIIGO,
                                   DescripcionCuenta = puc.DescripcionCuenta,
                                   CuentaNAV = puc.CuentaNAV,
                                   DetalleCuentaNav = puc.DetalleCuentaNav,
                                   TipoCuentaNav = puc.TipoCuentaNav,
                                   FichaBanco = puc.FichaBanco,
                                   Casa = puc.Casa,
                                   RequiereNotaIngles = puc.RequiereNotaIngles,

                               };
                if (dataPucs.Any())
                {
                    retorno.Pucs = dataPucs.ToList();
                }

            }

            return retorno;
        }


    
        public static dynamic ConsultarPucsByRubro(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            PucsListResponse retorno = new PucsListResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
              
                var dataPucs = from puc in db.TbPucs
                               where puc.Estado == true && puc.idRubro == id
                               select new PresupuestoCategoriaPuc
                               {
                                   Id = puc.id,
                                   IdCategoria = puc.idRubro,
                                   Tipo = puc.Tipo,
                                   CuentaSIIGO = puc.CuentaSIIGO,
                                   DescripcionCuenta = puc.DescripcionCuenta,
                                   CuentaNAV = puc.CuentaNAV,
                                   DetalleCuentaNav = puc.DetalleCuentaNav,
                                   TipoCuentaNav = puc.TipoCuentaNav,
                                   FichaBanco = puc.FichaBanco,
                                   Casa = puc.Casa,
                                   RequiereNotaIngles = puc.RequiereNotaIngles,

                               };
                if (dataPucs.Any())
                {
                    retorno.Pucs = dataPucs.ToList();
                }

            }

            return retorno;
        }


        #region Tabla Presupuesto Coberturas

        public static dynamic GuardarPresupuesto(IContextFactory factory, IOptions<ConnectionDB> connection, DbPresupuesto datos)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {

                int conteo = 0;
                /// Se valida que la combinacion anio programa y ceco no exista dos veces.
                var data = from pro in db.TbPresupuestos
                           join panio in db.TbPresupuestoAnio on pro.idPresupuestoAnio equals panio.id 
                           where pro.idPrograma == datos.idPrograma 
                           && pro.IdProgramaCecos == datos.IdProgramaCecos
                           && panio.id  == datos.idPresupuestoAnio

                           select pro;
               
                    conteo = data.ToList().Count;
                
                    var anio = from panio in db.TbPresupuestoAnio
                               where  panio.id == datos.idPresupuestoAnio
                               select panio;
                    if (anio.Any())
                    {
                        datos.Anio = anio.First().Anio;
                    }

                    var dataCeco = from ceco in db.TbProgramasCecos
                                   where ceco.id == datos.IdProgramaCecos
                                   select ceco;
                    if (dataCeco.Any())
                    {
                        conteo++;
                        datos.NombreContrato = "Contrato - " + dataCeco.First().CodigoCeco + "/" + dataCeco.First().SubCentro + " - "  + dataCeco.First().NombreSubCentro +" # "+ conteo;
                        datos.idFinanciador = dataCeco.First().idFinanciador;
                    }
                 
                    datos.fecha_actualizacion = DateTime.Now;
                    datos.fecha_creacion = DateTime.Now;

                    db.TbPresupuestos.Add(datos);
                    db.SaveChanges();
                



            }

            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic ActualizarPresupuesto(IContextFactory factory, IOptions<ConnectionDB> connection, DbPresupuesto datos)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbPresupuestos
                           where pro.idPrograma == datos.idPrograma && pro.Anio == datos.Anio

                           select pro;
                if (data.Any())
                {
                    data.First().CoberturaAnual = datos.CoberturaAnual;
                    data.First().CoberturaMensualEsperada = datos.CoberturaMensualEsperada;
                    data.First().CoberturaMensual = datos.CoberturaMensual;
                    data.First().CoberturasCasas = datos.CoberturasCasas;
                    db.SaveChanges();
                }




            }

            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic ConsultarPresupuestosByProgram(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoProgramRequest request)
        {

            PresupuestoByProgramResponse retorno = new PresupuestoByProgramResponse();

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pre in db.TbPresupuestos
                           join ceco in db.TbProgramasCecos on pre.idPrograma equals ceco.idPrograma
                           join panio in db.TbPresupuestoAnio on pre.idPresupuestoAnio equals panio.id
                           join finan in db.TbFinanciadores on ceco.idFinanciador equals finan.id
                           where pre.idPrograma == request.IdPresupuesto && panio.actual == true
                           select new ResponsePresupuesto
                           { 
                              idPrograma = pre.idPrograma,
                              Anio = pre.Anio,
                              CoberturaAnual = pre.CoberturaAnual,
                              CoberturaMensual = pre.CoberturaMensual,
                              CoberturasCasas = pre.CoberturasCasas,
                              CoberturaMensualEsperada = pre.CoberturaMensualEsperada,
                              id = pre.id,
                              Financiador = finan.nombre
                           };
                if (data.Any())
                {
                    retorno.presupuesto = data.ToList();
                }

                var programa = from pro in db.TbProgramas
                               join Tprograma in db.TbTipoPrograma on pro.id_tipo_programa equals Tprograma.id
                               where pro.id == request.IdPresupuesto
                           select new Program
                           {
                               Cobertura = Tprograma.cobertura
                           };
                if (programa.Any())
                {
                    retorno.programa = programa.First();
                }

            }

            return retorno;
        }

        #endregion


        #region Tabla PresupuestoProgramas

        public static dynamic GuardarDetallePresupuesto(IContextFactory factory, IOptions<ConnectionDB> connection, DbPresupuestoPrograma datos)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {
                if (datos.Cargo == 0)
                {
                    datos.Cargo = null;
                }
                datos.fecha_actualizacion = DateTime.Now;
                datos.fecha_creacion = DateTime.Now;
                datos.Total = (datos.Enero + datos.Febrero + datos.Marzo + datos.Abril + datos.Mayo + datos.Junio + datos.Julio + datos.Agosto + datos.Septiembre + datos.Octubre + datos.Noviembre + datos.Diciembre);
                db.TbPresupuestosProgramas.Add(datos);
                db.SaveChanges();
            }

            return new { id = 0, status = "OK", code = 200 };
        }



        public static dynamic GuardarDetallePresupuestoSinCobertura(IContextFactory factory, IOptions<ConnectionDB> connection, DbPresupuestoPrograma datos)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {
                if (datos.Cargo == 0)
                {
                    datos.Cargo = null;
                }
                datos.fecha_actualizacion = DateTime.Now;
                datos.fecha_creacion = DateTime.Now;


                datos.Total = (datos.Enero + datos.Febrero + datos.Marzo + datos.Abril + datos.Mayo + datos.Junio + datos.Julio + datos.Agosto + datos.Septiembre + datos.Octubre + datos.Noviembre + datos.Diciembre);
                db.TbPresupuestosProgramas.Add(datos);
                db.SaveChanges();
            }

            return new { id = 0, status = "OK", code = 200 };
        }




        public static dynamic ActualizarPresupuestoProgramas(IContextFactory factory, IOptions<ConnectionDB> connection, DbPresupuestoPrograma datos)
        {

            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbPresupuestosProgramas
                           where pro.id == datos.idPresupuesto

                           select pro;
                if (data.Any())
                {
                    int porcentaje = 0;
                    if(datos.Asignacion != null)
                    {
                        porcentaje = (int)datos.Asignacion/100;
                    }
                    data.First().NumeroIdentificacion = datos.NumeroIdentificacion == null? null: datos.NumeroIdentificacion;
                    data.First().Nombre = datos.Nombre;
                    data.First().Cargo = datos.Cargo;
                    data.First().Asignacion =  datos.Asignacion == null ? null : datos.Asignacion;
                    data.First().NoCasa = datos.NoCasa == null ? null : datos.NoCasa;
                    data.First().NoKids = datos.NoKids == null ? null : datos.NoKids;
                    data.First().Enero = datos.Enero;
                    data.First().Febrero = datos.Febrero;
                    data.First().Marzo = datos.Marzo;
                    data.First().Abril = datos.Abril;
                    data.First().Mayo = datos.Mayo;
                    data.First().Junio = datos.Junio;
                    data.First().Julio = datos.Julio;

                    data.First().Agosto = datos.Agosto;
                    data.First().Septiembre = datos.Septiembre;
                    data.First().Octubre = datos.Octubre;
                    data.First().Noviembre = datos.Noviembre;
                    data.First().Diciembre = datos.Diciembre;
                    data.First().NotaIngles = datos.NotaIngles;
                    data.First().DetalleGasto = datos.DetalleGasto;
                    data.First().Total = datos.Enero + datos.Febrero + datos.Marzo + datos.Abril + datos.Mayo + datos.Junio +
                        datos.Julio + datos.Agosto + datos.Septiembre + datos.Octubre + datos.Noviembre + datos.Diciembre;
                    ;
                    data.First().TotalAnual = data.First().Total * porcentaje;
                    datos.fecha_actualizacion = DateTime.Now;

                    db.SaveChanges();
                }




            }

            return new { id = 0, status = "OK", code = 200 };
        }


        public static dynamic ConsultarDetallePresupuestosByProgramas(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoProgramRequest request)
        {
            PresupuestodetalleView retorno = new PresupuestodetalleView();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.ViewPresupuestos


                           where pro.idPresupuesto == request.IdPresupuesto
                           select pro;
                          
                if (data.Any())
                {
                    retorno.DetallePresupuesto = data.ToList();
                }
                else
                {
                    retorno.DetallePresupuesto = new List<View_DbPresupuesto>();

                }


            }

            return retorno;
        }

        public static dynamic ConsultarDetallePresupuestosByProgramasExport(IContextFactory factory, IOptions<ConnectionDB> connection, PresupuestoProgramRequest request)
        {
            Presupuestodetalle retorno = new Presupuestodetalle();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var data = from pro in db.TbProgramas
                         
                           join pre in db.TbPresupuestos on pro.id equals pre.idPrograma
                           join panio in db.TbPresupuestoAnio on pre.idPresupuestoAnio  equals panio.id
                           join tpro in db.TbTipoPrograma on pro.id_tipo_programa equals tpro.id
                           join prep in db.TbPresupuestosProgramas on pre.id equals prep.idPresupuesto
                           join cec in db.TbProgramasCecos on prep.idProgramaCecos equals cec.id
                           join cargo in db.TbCargos on pre.id equals cargo.id
                           join puc in db.TbPucs on prep.idRubroPucs equals puc.id
                           join rubro in db.TbRubros on puc.idRubro equals rubro.id
                           where panio.id == request.IdPresupuesto
                           select new PresupuestoProgramResponse
                           {
                              id = prep.id,
                               idPresupuesto = pre.id,
                               Programa = pro.Nombre,
                               Anio = pre.Anio,
                               ClasificacionGasto = tpro.cobertura == true? "OPERACIONAL" : "ADMINISTRATIVO",
                               CentroCosto = cec.CodigoCeco,
                               NombreCentroCosto = cec.Nombre,
                               SubCentroCosto = cec.SubCentro,
                               NombreSubCentroCosto = cec.NombreSubCentro,
                               NombreRubro = rubro.Nombre,
                               esNomina = rubro.esNomina,
                               EsPptp=   rubro.EsPptp,
                               CuentaSIIGO =   puc.CuentaSIIGO,
                               NombreCuenta = puc.DescripcionCuenta,
                               CuentaCotable = puc.CuentaNAV,
                               Facility = cec.FacilityNav,
                               DetalleGasto =  prep.DetalleGasto,
                               NotaIngles= prep.NotaIngles,
                               NoCasa = prep.NoCasa,
                               NoKids = prep.NoKids,
                               NumeroIdentificacion= prep.NumeroIdentificacion,
                               Nombre= prep.Nombre,
                               Asignacion = prep.Asignacion,
                               Cargo = cargo.cargo,
                               Enero =prep.Enero,
                               Febrero = prep.Febrero,
                               Marzo= prep.Marzo,
                               Abril=  prep.Abril,
                               Mayo = prep.Mayo,
                               Junio= prep.Junio,
                               Julio = prep.Julio,
                               Agosto = prep.Agosto,
                               Septiembre = prep.Septiembre,
                               Octubre = prep.Octubre,
                               Noviembre = prep.Noviembre,
                               Diciembre=  prep.Diciembre,
                               Total =  prep.Total

                           };
                if (data.Any())
                {
                    retorno.DetallePresupuesto = data.ToList();
                }
                else {
                    retorno.DetallePresupuesto = new List<PresupuestoProgramResponse>();

                }


            }

            return retorno;
        }

        #endregion


      
    }
}
