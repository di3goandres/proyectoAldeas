using System;
using System.Collections.Generic;

namespace ApiRestAldeas.Models
{

    public class Centro
    {

        /// 
        /// </summary>
        public int CodigoCentro { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Nombre { get; set; }


    }

    public class SubCentro
    {
       

        /// <summary>
        /// 
        /// </summary>
        public int CodigoCentro { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CodigoSubCentro { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Nombre{ get; set; }

    }
    public class CentrosResponse
    {
        public List<Centro> CentrosCostos { get; set; }
        public List<SubCentro> SubCentro { get; set; }
    }


}
