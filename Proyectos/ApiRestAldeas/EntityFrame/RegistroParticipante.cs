﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeas.EntityFrame
{
    public class RegistroParticipante
    {
        public long id { get; set; }
        public long idProyecto { get; set; }
        public int idMunicipio { get; set; }
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
        public long? id_origen { get; set; }


    }
}
