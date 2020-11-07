using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Models
{
    public class RegistroParticipantesProyectosResponse
    {

        public RegistroParticipantesProyectosResponse()
        {
            this.Registros = new List<RegistroParticipante>();
        }
        public  List<RegistroParticipante> Registros { get; set; }

    }
}
