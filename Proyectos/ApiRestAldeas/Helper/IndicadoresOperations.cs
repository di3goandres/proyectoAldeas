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
    public class IndicadoresOperations
    {
        public static dynamic ConsultarListaIndicadores(IContextFactory factory, IOptions<ConnectionDB> connection)
        {
            IndicadoresResponse retorno = new IndicadoresResponse();
            using (Aldeas_Context db = factory.Create(connection))
            {


                var indicadores = from datos in db.tbIndicadores

                                  select datos;

                if (indicadores.Any())
                {
                    retorno.Indicadores = indicadores.ToList();

                }

            }
            return retorno;
        }



        public static dynamic ConsultarPreguntasIndicador(IContextFactory factory, IOptions<ConnectionDB> connection, string id)
        {
            IndicadoresPreguntasResponse retorno = new IndicadoresPreguntasResponse();

            List<ListaPreguntas> listaPreguntas = new List<ListaPreguntas>();

            using (Aldeas_Context db = factory.Create(connection))
            {

                var splitIds = id.Split(",").ToList();

                var indicadores = from datos in db.TbIndicadoresPreguntas
                                  where splitIds.Contains(datos.id_indicador.ToString())
                                  select new PreguntasIndicadores
                                  {
                                      id = datos.id,
                                      id_indicador = datos.id_indicador,
                                      id_indicador_pregunta_padre = datos.id_indicador_pregunta_padre,
                                      esPadre = datos.esPadre,
                                      descripcion = datos.descripcion,
                                      Tipo = datos.Tipo,
                                      fechaActualizacion = datos.fechaActualizacion,
                                      fechaCreacion = datos.fechaCreacion

                                  };



                if (indicadores.Any())
                {
                    foreach (var idIndicador in splitIds)
                    {

                        IndicadorPreguntas indicador = new IndicadorPreguntas();


                        var idInd = Int64.Parse(idIndicador);

                        var padres = indicadores.Where(x => x.esPadre == true && x.id_indicador == idInd).ToList();
                        var hijos = indicadores.Where(x => x.esPadre == false).ToList();
                        var nombre = from datos in db.tbIndicadores
                                     where datos.id == idInd
                                     select datos;

                        if (nombre.Any())
                        {
                            indicador.Indicador = nombre.First().NombreIndicador;
                        }

                        foreach (var padre in padres)
                        {
                            ListaPreguntas item = new ListaPreguntas();
                            item.Encabezado = padre;
                            foreach (var hijo in hijos.Where(x => x.id_indicador_pregunta_padre == padre.id).ToList())
                            {
                                if (hijo.Tipo == 2)
                                {
                                    long idPregunta = hijo.id;
                                    hijo.Complemento = new List<DBIndicadorComplemento>();
                                    var complemento = from datos in db.TbIndicadorComplemento
                                                      where datos.idPregunta == idPregunta
                                                      select datos;
                                    if (complemento.Any())
                                    {

                                        hijo.Complemento.AddRange(complemento.ToList());

                                    }

                                    item.Preguntas.Add(hijo);

                                }
                                else
                                {
                                    item.Preguntas.Add(hijo);

                                }

                            }
                            indicador.ListaPreguntas.Add(item);


                        }
                        retorno.ListaPreguntas.Add(indicador);
                    }



                }

            }
            return retorno;
        }

        public static dynamic AsociarIndicadorParticipante(IContextFactory factory, IOptions<ConnectionDB> connection, IndicadoresRequest request)
        {
            long idrespuesta = 0;
            using (Aldeas_Context db = factory.Create(connection))
            {
                List<DBIndicadorRespuestas> respuestas = new List<DBIndicadorRespuestas>();

                foreach(var datos in request.Respuestas)
                {
                    respuestas.Add(new DBIndicadorRespuestas()
                    {
                        idProyecto = request.idProyecto,
                        idRegistroParticipante = request.idRegistroParticipante,
                        idIndicadorPregunta = datos.idIndicadorPregunta,
                        respuestaSi_No = datos.respuestaSi_No == null ? null : datos.respuestaSi_No,
                        esOtro = datos.esOtro == null ? false : datos.esOtro,
                        Respuesta = datos.Respuesta == null ? "" : datos.Respuesta,
                        idComplemento = datos.idComplemento == null ? null : datos.idComplemento,
                        fechaCreacion = DateTime.Now,
                        fechaActualizacion = DateTime.Now

                    });
                }
                db.TBIndicadorRespuestas.AddRange(respuestas);
                db.SaveChanges();
                idrespuesta = 1;

            }
            return new { id = idrespuesta, status = idrespuesta == 0 ? "error" : "OK", code = 200 };
        }


    }

}
