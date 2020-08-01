using System;
using System.Collections.Generic;

namespace ApiRestAldeas.Models
{

    public class Fechas
    {
        public DateTime Fecha { get; set; }
    }

    public class Municipios
    {
        public int  CodigoDepartamento { get; set; }
        public int  CodigoMunicipio { get; set; }

    }
    public class ProyectoRequest
    {
        public string Nombre { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Donante { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string TipoFinanciacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string TipoImplementacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string NombreDonante { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Direccion { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Telefono { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime FechaInicio { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime FechaFinalizacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string LiderEjecucion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string LiderCoordinacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ComiteTecnico { get; set; }


        public string Requiere { get; set; }


        public List<Fechas> FechasInformes { get; set; }

        public List<Fechas> FechasComites { get; set; }

        
        public List<Municipios> Municipio { get; set; }



    }
}
