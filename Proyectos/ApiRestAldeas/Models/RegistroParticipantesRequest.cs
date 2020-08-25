using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeas.Models
{
    public class Preguntas
    {
        public string name { get; set; }
        public string Pregunta { get; set; }

        public bool esOtro { get; set; }
        public string valorOtro { get; set; }
    }
    public class RegistroParticipantesRequest
    {
        public long idProyecto { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string EstatusResidencia { get; set; }
        public string Sexo { get; set; }
        public int CodMunicipio { get; set; }

        public string Localidad { get; set; }
        public string UltimoCursoAprobado { get; set; }
        public string AsisteAlColegio { get; set; }
        public int Edad { get; set; }
        public List<Preguntas> Linea { get; set; }

        public List<Participantes> Participantes { get; set; }
    }
}
