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
        public List<ProyectosSinArchivo> ItemsProyectos { get; set; }
    }

    public partial class ProyectosSinArchivo
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


        public string tipo_implementacion { get; set; }


        public string telefono { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string comite_tecnico { get; set; }

        public bool requiereLiquidacion { get; set; }


     
        public string Nombrearchivo { get; set; }


        public string tipoArchivo { get; set; }







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

        public int  id_departamento { get; set; }

        public int  id_municipio { get; set; }

        public string departamento { get; set; }

        public string municipio { get; set; }
    }

    public class ProyectadosResponse
    {
        public ProyectadosResponse()
        {
            this.ListParticipantes = new List<DBParticipantes>();
        }
        public  long id { get; set; }
        public int TotalFamilias { get; set; }
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

    public class FechasEntregasRequest
    {
        public FechasEntregas ItemsFechas { get; set; }
    }

    public class ProyectadosRequest
    {
        public ProyectadosResponse ItemProyectados { get; set; }

    }

    public class MunicipioRequest
    {
        public ProyectoMunicipioResponse ItemsMunicipios { get; set; }
    }

    public class ArchivoResponse
    {
        public long Idproyecto { get; set; }

        public string NombreArchivo { get; set; }
        public string TipoArchivo { get; set; }
    }
}
