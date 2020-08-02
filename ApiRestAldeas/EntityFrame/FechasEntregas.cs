using System;
namespace ApiRestAldeas.EntityFrame
{
    public class FechasEntregas
    {
        /// <summary>
        /// 
        /// </summary>
        public long id { get; set; }

        public long id_proyecto { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DateTime fecha { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string tipo_fecha { get; set; }
    }
}
