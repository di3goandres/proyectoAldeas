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
        public ProyectoUnicoResponse()
        {
            this.ItemsFechas = new List<FechasEntregas>();
            this.ItemsMunicipios = new List<ProyectoMunicipioResponse>();
            this.ItemsEjecucion = new List<TbEjecucion>();
            this.ItemsCentroCostos = new List<ColaboradorInforFinanciera>();
            this.ItemProyectados = new ProyectadosResponse();

        }
        public Proyectos ItemProyecto { get; set; }
        public InformacionFinanciera ItemFinanciera { get; set; }
        public List<FechasEntregas> ItemsFechas { get; set; }
        public List<ProyectoMunicipioResponse> ItemsMunicipios { get; set; }
        public List<TbEjecucion> ItemsEjecucion { get; set; }
        public List<ColaboradorInforFinanciera> ItemsCentroCostos { get; set; }
        public ProyectadosResponse ItemProyectados { get; set; }
    }

    public class ProyectoCecoResponse
    {
        public List<ColaboradorInforFinanciera> ItemsCentroCostos { get; set; }
    }

    public class ProyectoMunicipioResponse
    {
        public long id { get; set; }

        public long id_proyecto { get; set; }

        public string id_departamento { get; set; }

        public string id_municipio { get; set; }
    }

    public class ProyectadosResponse
    {
        public ProyectadosResponse()
        {
            this.ListParticipantes = new List<DBParticipantes>();
        }
        public  long id { get; set; }
        public long TotalFamilias { get; set; }
        public string Observaciones { get; set; }
        ///  Mujeres, Hombres, Otros, Adicionales
        /// </summary>
        public List<DBParticipantes> ListParticipantes { get; set; } 

    }


    public class EjecucionFinancieraRequest
    {
        public List<TbEjecucion> ItemsEjecucion { get; set; }
    }

    public class ItemProyectoRequest
    {
        public Proyectos ItemProyecto { get; set; }
    }

    public class InformacionFinancieraRequest
    {
        public InformacionFinanciera ItemFinanciera { get; set; }
    }
}
