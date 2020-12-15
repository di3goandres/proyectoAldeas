using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Models
{

    public class ActualizarIntegrantesRequest
    {
        public List<DBIntegrantes> IntegrantesFamilia { get; set; }
    }
    public class RegistroParticipantesProyectosResponse
    {

        public RegistroParticipantesProyectosResponse()
        {
            this.Registros = new List<RegistroParticipanteResponse>();
        }
        public  List<RegistroParticipanteResponse> Registros { get; set; }

    }


    public class RegistroParticipanteProyectosResponse
    {
        public RegistroParticipanteResponse Participante { get; set; }
        public List<RegistroParticipanteResponse> ParticipanteLista { get; set; }

        public List<RegistroPreguntas> Preguntas { get; set; }
        public List<DBIntegrantes> IntegrantesFamilia { get; set; }
    }
    public class RegistroParticipanteResponse
    {
        public long id { get; set; }
        public long idProyecto { get; set; }
        public int idMunicipio { get; set; }
        public string Municipio { get; set; }
        public int idDepartamento { get; set; }

        public string Departamento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Edad { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime? FechaSalida { get; set; }
        public string Localidad { get; set; }
        public string Sexo { get; set; }
        public string EstatusResidencia { get; set; }
        public string UltimoCursoAprobado { get; set; }
        public string AsisteAlColegio { get; set; }
        public string GrupoPoblacional { get; set; }
        public string GrupoEtnico { get; set; }
        public string Nacionalidad { get; set; }
        public string Genero { get; set; }
        public string TipoParticipante { get; set; }
        public string Discapacidad { get; set; }
        public string NivelEscolaridad { get; set; }

    }

    public class LineaProyecto
    {

    }
}
