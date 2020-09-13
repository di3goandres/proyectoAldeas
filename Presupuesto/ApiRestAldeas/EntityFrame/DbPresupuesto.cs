﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiRestAldeasPresupuesto.EntityFrame
{
    public class DbPresupuesto
    {

        [Key]
        public long id { get; set; }
        public long idPrograma { get; set; }
        public int Anio { get; set; }
        public Decimal CoberturaAnual { get; set; }
        public Decimal CoberturaMensual { get; set; }
        public Decimal CoberturaMensualEsperada { get; set; }
        public Decimal CoberturasCasas { get; set; }





    }
}