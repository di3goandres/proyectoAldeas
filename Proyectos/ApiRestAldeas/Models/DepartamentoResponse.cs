using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Models
{
    public class Departamento
    {
     
        /// 
        /// </summary>
        public int Codigo { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Nombre { get; set; }


    }

    public class Municipio
    {
        /// <summary>
        /// 
        /// </summary>
        public int Codigo  { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Boolean Activo { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int CodigoDepartamento { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Nombre { get; set; }

    }
    public class DepartamentoResponse
    {

        public List<Departamento> Departamentos { get; set; }
        public List<Municipio> Municipios { get; set; }
    }
}
