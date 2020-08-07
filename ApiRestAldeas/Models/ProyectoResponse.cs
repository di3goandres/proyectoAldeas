using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeas.Models
{
    public class Item
    {
        /// </summary>
        public long Codigo { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Nombre { get; set; }
        /// <summary>
    }
    public class ProyectoResponse
    {
      public  List<Item> ItemsProyectos { get; set; }
    }
}
