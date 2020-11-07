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



        public static dynamic ConsultarPreguntasIndicador(IContextFactory factory, IOptions<ConnectionDB> connection, long id)
        {
            IndicadoresPreguntasResponse retorno = new IndicadoresPreguntasResponse();
           
            List<ListaPreguntas> listaPreguntas = new List<ListaPreguntas>();

            using (Aldeas_Context db = factory.Create(connection))
            {


                var indicadores = from datos in db.TbIndicadoresPreguntas
                                  where datos.id_indicador == id
                                  select new PreguntasIndicadores
                                  {
                                      id = datos.id,
                                      id_indicador = datos.id_indicador,
                                      id_indicador_pregunta_padre = datos.id_indicador_pregunta_padre,
                                      esPadre = datos.esPadre,
                                      descripcion = datos.descripcion,
                                      Tipo=datos.Tipo,
                                      fechaActualizacion = datos.fechaActualizacion,
                                      fechaCreacion = datos.fechaCreacion

                                  };
            

              
                    if (indicadores.Any())
                {
                    var padres = indicadores.Where(x => x.esPadre == true).ToList();
                    var hijos = indicadores.Where(x => x.esPadre == false).ToList();


                    foreach (var padre in padres)
                    {
                        ListaPreguntas item = new ListaPreguntas();
                        item.Encabezado = padre;
                        foreach (var hijo in hijos.Where(x => x.id_indicador_pregunta_padre == padre.id).ToList())
                        {
                            if(hijo.Tipo == 2)
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

                        retorno.ListaPreguntas.Add(item);

                    }

                }

            }
            return retorno;
        }

    }
}
