using System;
namespace ApiRestAldeas.EntityFrame
{
    public partial class Proyectos
    {
        /// <summary>
        /// 
        /// </summary>
        public long id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string nombre { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string donante { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string tipo_financiacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string nombre_donante { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string direccion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string email { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime fecha_inicio { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime fecha_finalizacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string lider_ejecucion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string lider_coordinacion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string comite_tecnico { get; set; }

        public bool requiereLiquidacion { get; set; }


        public byte[] archivo { get; set; }

        public string Nombrearchivo { get; set; }



    }
}
