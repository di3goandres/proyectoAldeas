using System;
namespace ApiRestAldeas.EntityFrame
{
    public class DBParticipantesProyectados
    {
        /// <summary>
        /// 
        /// </summary>
        public long id { get; set; }
        public long id_proyecto { get; set; }
        public int TotalFamilias { get; set; }
        public string Observaciones { get; set; }
    }

    public class DBParticipantes
    {
        /// <summary>
        /// 
        /// </summary>
        public long id { get; set; }
        public long id_participantes { get; set; }
        public string Nombre { get; set; }
        public long Rango_0_5 { get; set; }
        public long Rango_6_12 { get; set; }
        public long Rango_13_17 { get; set; }
        public long Rango_18_24 { get; set; }
        public long Rango_25_56 { get; set; }
        public long Mayores_60 { get; set; }
        public long Total { get; set; }
        public long TotalDesagregado { get; set; }
        public long Porcentaje { get; set; }
    }
}
