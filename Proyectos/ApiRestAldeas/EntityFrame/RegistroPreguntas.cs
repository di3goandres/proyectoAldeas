using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeas.EntityFrame
{
    public class RegistroPreguntas
    {
        public long id { get; set; }
        public long idParticipante { get; set; }
        public string Pregunta { get; set; }


        public string Valor { get; set; }

        public bool esOtro { get; set; }
    }
}
