using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Models;
using Microsoft.Extensions.Options;
using System.Linq;
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
                    idProyecto = request.Proyecto,
                    Nombre = request.Nombre,
                    FechaNacimiento = Utils.CambiarFecha(request.Fecha),
                    Cargo = request.Cargo,
                    Tiempo = request.Tiempo,
                    TipoContrato = request.TipoContrato,
                    FechaInicio = Utils.CambiarFecha(request.FechaInicio),
                    FechaFin = Utils.CambiarFecha(request.FechaFin),
                    CostoMensual = request.CostoMensual,
                    Porcentaje= request.Porcentaje,
                    Contrapartida = request.Contrapartida,
                    Aporte = request.Aporte


                };
                db.TbColaboradors.Add(nuevo);

                db.SaveChanges();
                var infoCentroCostos = request.ListCentroCostos;
                List<ColaboradorInforFinanciera> listaCentroCostos = new List<ColaboradorInforFinanciera>();
                foreach (var item in infoCentroCostos)
                {
                    listaCentroCostos.Add(new ColaboradorInforFinanciera()
                    {
                        Codigo = item.Name,
                        id_SubCentroCosto = item.Codigo,
                        id_InfoFinanciera =null,
                        id_Colaboradores = nuevo.Id
                    });
                }
                db.TbCICentroCostos.AddRange(listaCentroCostos);
              
               
                db.SaveChanges();
                idProyecto = nuevo.Id;




            }
            return new { status = idProyecto == 0 ? "error" : "OK", code = 200 };
        }



        public static dynamic ConsultarColaboradoresProyecto(IContextFactory factory, IOptions<ConnectionDB> connection,
          long idProyecto)
        {
            ColaboradorResponse retorno = new ColaboradorResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var Colaboradores = from dato in db.TbColaboradors

                                               where dato.idProyecto == idProyecto

                                               select dato;
                                              


                if (Colaboradores.Any())
                {
                    retorno.ItemsColaboradores = Colaboradores.ToList();

                   
                }
            }

            return retorno;
        }



        public static dynamic Exportdata(IContextFactory factory, IOptions<ConnectionDB> connection
       )
        {
            ColaboradorResponse retorno = new ColaboradorResponse();


            using (Aldeas_Context db = factory.Create(connection))
            {

                var Colaboradores = from dato in db.TbColaboradors

                               

                                    select dato;



                if (Colaboradores.Any())
                {
                    retorno.ItemsColaboradores = Colaboradores.ToList();


                }
            }

            return retorno;
        }

        public static dynamic ConsultarDetalleColaboradores(IContextFactory factory, IOptions<ConnectionDB> connection,
          long idColaborador)
        {
            ColaboradorDetalleResponse retorno = new ColaboradorDetalleResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {
                var Colaboradores = from dato in db.TbColaboradors
                                    where dato.Id == idColaborador
                                    select dato;
                if (Colaboradores.Any())
                {
                    retorno.Item = Colaboradores.First();
                    var cecos = from dato in db.TbCICentroCostos
                                where dato.id_Colaboradores == idColaborador
                                select dato;

                    if (cecos.Any())
                    {
                        retorno.ItemsCentroCosto = cecos.ToList();

                    }


                }
            }
            return retorno;
        }


    }
}
