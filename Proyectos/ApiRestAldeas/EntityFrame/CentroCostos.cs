using System;
namespace ApiRestAldeas.EntityFrame
{
    public class CentroCostos
    {
        /// <summary>
        /// 
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Codigo { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CentroCosto { get; set; }

    }

    public class SubCentroCostos
    {
        /// <summary>
        /// 
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CodigoCentro { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SubCodigo { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SubCentroCosto { get; set; }

    }
}
