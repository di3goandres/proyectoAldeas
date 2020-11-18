using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiRestAldeas.EntityFrame;

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

    public class ProyectoListaResponse
    {
        public List<Proyectos> ItemsProyectos { get; set; }
    }

    public class ProyectoUnicoResponse
    {
        public Proyectos ItemProyecto { get; set; }
        public InformacionFinanciera ItemFinanciera { get; set; }
        public List<FechasEntregas> ItemsFechas { get; set; }
        public List<MunicipioProyectos> ItemsMunicipios { get; set; }
        public List<TbEjecucion> ItemsEjecucion { get; set; }
        public List<ColaboradorInforFinanciera> ItemsCentroCostos { get; set; }
        public ProyectadosResponse ItemProyectados { get; set; }
    }

    public class ProyectadosResponse
    {
        public  long id { get; set; }
        public long TotalFamilias { get; set; }
        public string Observaciones { get; set; }
        ///  Mujeres, Hombres, Otros, Adicionales
        /// </summary>
        public List<DBParticipantes> ListParticipantes = new List<DBParticipantes>();

    }

}
