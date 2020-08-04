using System;
namespace ApiRestAldeas.EntityFrame
{
    public class InformacionFinanciera
    {
        /// <summary>
        /// 
        /// </summary>
        public long id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public long id_proyecto { get; set; }

        public long costoTotal { get; set; }

        public string fuente { get; set; }

        public string tipoFuente { get; set; }

        public string monedaDonacion { get; set; }

        public string tasacambio { get; set; }

        public string cuenta { get; set; }

        public string navision { get; set; }

        public int idSubCentroCostos { get; set; }

        public string responsable  { get; set; }

        public string lugar { get; set; }



    }
}
