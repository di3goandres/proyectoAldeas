using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace ApiRestAldeas.Models
{

    //public class Otros
    //{
    //    public string Nombre { get; set; }
    //    public int Total { get; set; }

    //}
    public class Participantes {
        public string Nombre { get; set; }
        public long Rango_0_5 {get;set;}
        public long Rango_6_12 {get;set;}
        public long Rango_13_17 {get;set;}
        public long Rango_18_24 {get;set;}
        public long Rango_25_56 {get;set;}
        public long Mayores_60 {get;set;}
        public long Total {get;set;}
    }

    public class Proyectados
    {
        public int TotalFamilias { get; set; }

        public string Observaciones{ get; set; }

        public List<Participantes> ListaParticipantes { get; set; }

        public List<Participantes> OtrosParticipantes { get; set; }
    }
    public class Ejecucion
    {
        public string Nombre{get;set;}
        public long Enero{get;set;}
        public long Febrero{get;set;}
        public long Marzo{get;set;}
        public long Abril{get;set;}
        public long Mayo{get;set;}
        public long Junio{get;set;}
        public long Julio{get;set;}
        public long Agosto{get;set;}
        public long Sept{get;set;}
        public long Octubre{get;set;}
        public long Noviembre{get;set;}
        public long Diciembre{get;set;}
    }
    public class Financiera
    {
            public long CostoTotal { get; set; }
            public string FuentePresupuesto { get; set; }
            public string TipoFuente { get; set; }
            public string MonedaDonacion { get; set; }
            public string TasaCambio { get; set; }
            public string Cuenta { get; set; }
            public int CentroCostos { get; set; }
            public int SubCentro { get; set; }
            public string Responsable { get; set; }
            public string Lugar { get; set; }

            public string NavisionFacilitiy { get; set; }
            public List<Fechas> Desembolsos { get; set; }
            public List<Fechas> Visitas { get; set; }

    }


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

        public Financiera InfoFinanciera { get; set; }

        public List<Ejecucion> ListaEjecucion { get; set; }

        public Proyectados ParticiProyectados { get; set; }

    }

    public class FileInputModel
    {
        public IFormFile File { get; set; }
        public long Proyecto { get; set; }
    }
}
