using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Models
{
    public class IndicadoresPreguntasResponse
    {
        public IndicadoresPreguntasResponse()
        {
            this.ListaPreguntas = new List<IndicadorPreguntas>();

        }
        public List<IndicadorPreguntas> ListaPreguntas { get; set; }
    }

    public class IndicadorPreguntas
    {

        public IndicadorPreguntas()
        {
            this.ListaPreguntas = new List<ListaPreguntas>();

        }
        public string Indicador { get; set; }
        public List<ListaPreguntas> ListaPreguntas { get; set; }
    }

    public class ListaPreguntas{

        public ListaPreguntas()
        {
            this.Preguntas = new List<PreguntasIndicadores>();

        }
        public PreguntasIndicadores Encabezado { get; set; }
        public List<PreguntasIndicadores> Preguntas { get; set; }
    }
    public class PreguntasIndicadores
    {
        public PreguntasIndicadores()
        {
            this.Complemento = new List<DBIndicadorComplemento>();
        }
        public long id { get; set; }
        public long id_indicador { get; set; }
        public long? id_indicador_pregunta_padre { get; set; }
        public bool esPadre { get; set; }
        public string descripcion { get; set; }
        public int Tipo { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime fechaActualizacion { get; set; }
        public List<DBIndicadorComplemento> Complemento { get; set; }
    }


}
