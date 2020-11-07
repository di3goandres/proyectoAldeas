using System;
using System.Collections.Generic;
using ApiRestAldeas.EntityFrame;

namespace ApiRestAldeas.Models
{
    public class IndicadoresResponse
    {
        public IndicadoresResponse()
        {
            this.Indicadores = new List<DBIndicadores>();
        }
        public List<DBIndicadores> Indicadores { get; set; }
    }
}
